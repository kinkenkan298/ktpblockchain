// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract HashStorage {
    struct HashRecord {
        string hash;
        address owner;
        uint256 timestamp;
        bool isActive;
        string metadata;
    }

    struct DataPermisson {
        address requester;
        address owner;
        uint256 recordId;
        bool isApproved;
        uint256 expiryTime;
        uint256 approvedAt;
        string purpose;
    }

    mapping(uint256 => HashRecord) public hashRecords;
    mapping(address => uint256[]) public userRecords;
    mapping(bytes32 => DataPermisson) public dataPermisson;
    mapping(address => bytes32[]) public userPermissionRequests;
    mapping(address => bytes32[]) public userPermissionApprovals;

    uint256 public nextId;

    event HashStored(uint256 indexed id, string hash, address indexed owner, uint256 timestamp, string metadata, string ActionType);

    event HashUpdate(uint256 indexed id, string oldHash, string newHash, uint256 timestamp, string ActionType);

    event HashDelete(uint256 indexed id, address indexed owner, uint256 timestamp, string actionType);

    event DataRequested(
        bytes32 indexed permissionId,
        address indexed requester,
        address indexed owner,
        uint256 recordId,
        string purpose,
        uint256 timestamp,
        string actionType
    );
    event DataApproved(
        bytes32 indexed permissionId,
        address indexed requester,
        address indexed owner,
        uint256 recordId,
        uint256 expiryTime,
        uint256 timestamp,
        string actionType
    );
    event DataRevoked(bytes32 indexed permissionId, address indexed revoker, uint256 timestamp, string actionType);

    modifier onlyOwner(uint256 _id) {
        require(hashRecords[_id].owner == msg.sender, "Bukan pemilik");
        require(hashRecords[_id].isActive, "Catatan sudah di hapus");
        _;
    }

    modifier recordExists(uint256 _id) {
        require(hashRecords[_id].owner != address(0), "Catatan data tidak ada");
        _;
    }

    function storeHash(string memory _hash, string memory _metadata) public returns (uint256) {
        uint256 id = nextId++;

        hashRecords[id] = HashRecord({
            hash: _hash,
            owner: msg.sender,
            timestamp: block.timestamp,
            isActive: true,
            metadata: _metadata
        });

        userRecords[msg.sender].push(id);

        emit HashStored(id, _hash, msg.sender, block.timestamp, _metadata, "CREATED");

        return id;
    }

    function getHash(uint256 _id)
        public
        view
        returns (string memory hash, address owner, uint256 timestamp, bool isActive, string memory metadata)
    {
        HashRecord memory record = hashRecords[_id];
        return (record.hash, record.owner, record.timestamp, isActive, metadata);
    }

    function getHashInfo(uint256 _id)
        public
        view
        recordExists(_id)
        returns (address owner, uint256 timestamp, bool isActive, string memory metadata)
    {
        HashRecord memory record = hashRecords[_id];
        return (record.owner, record.timestamp, record.isActive, record.metadata);
    }

    function getUserRecords(address _owner) public view returns (uint256[] memory) {
        return userRecords[_owner];
    }

    function updateHash(uint256 _id, string memory _newHash, string memory _newMetadata) public onlyOwner(_id) {
        require(hashRecords[_id].owner == msg.sender, "Not the owner");

        string memory oldHash = hashRecords[_id].hash;
        hashRecords[_id].hash = _newHash;
        hashRecords[_id].timestamp = block.timestamp;
        hashRecords[_id].metadata = _newMetadata;

        emit HashUpdate(_id, oldHash, _newHash, block.timestamp, "UPDATED");
    }

    function verifyHash(uint256 _id, string memory _hash) public view recordExists(_id) returns (bool) {
        HashRecord memory record = hashRecords[_id];
        return record.isActive && keccak256(bytes(hashRecords[_id].hash)) == keccak256(bytes(_hash));
    }

    function deleteHash(uint256 _id) public onlyOwner(_id) {
        hashRecords[_id].isActive = false;
        hashRecords[_id].timestamp = block.timestamp;

        emit HashDelete(_id, msg.sender, block.timestamp, "DELETE");
    }

    function requestsDataAccess(address _owner, uint256 _recordId, string memory _purpose)
        public
        recordExists(_recordId)
    {
        require(_owner != msg.sender, "Tidak bisa request data sendiri");
        require(hashRecords[_recordId].owner == _owner, "Pemilik tidak sama");
        require(hashRecords[_recordId].isActive, "Catatan sudah dihapus");

        bytes32 permissionId = keccak256(abi.encodePacked(msg.sender, _owner, _recordId));

        DataPermisson storage permission = dataPermisson[permissionId];

        if (permission.requester != address(0)) {
            bool isExpired =
                permission.isApproved && (permission.expiryTime == 0 || block.timestamp < permission.expiryTime);
            require(!isExpired, "Izin aktif masih berlaku atau menunggu approval");
        }

        dataPermisson[permissionId] = DataPermisson({
            requester: msg.sender,
            owner: _owner,
            recordId: _recordId,
            isApproved: false,
            expiryTime: 0,
            approvedAt: 0,
            purpose: _purpose
        });

        bool isNewRequest = true;
        for (uint256 i = 0; i < userPermissionRequests[msg.sender].length; i++) {
            if (userPermissionRequests[msg.sender][i] == permissionId) {
                isNewRequest = false;
                break;
            }
        }

        if (isNewRequest) {
            userPermissionRequests[msg.sender].push(permissionId);
            userPermissionApprovals[_owner].push(permissionId);
        }

        emit DataRequested(permissionId, msg.sender, _owner, _recordId, _purpose, block.timestamp, "Permintaan data");
    }

    function approvedDataAccess(address _requester, uint256 _recordId, uint256 _expiryDuration)
        public
        onlyOwner(_recordId)
    {
        bytes32 permissionId = keccak256(abi.encodePacked(_requester, msg.sender, _recordId));
        DataPermisson storage permission = dataPermisson[permissionId];

        require(permission.requester != address(0), "Permintaan tidak ada");
        require(!permission.isApproved, "Sudah pernah disetujui");

        permission.isApproved = true;
        permission.approvedAt = block.timestamp;
        permission.expiryTime = _expiryDuration > 0 ? block.timestamp + _expiryDuration : 0;

        emit DataApproved(
            permissionId, _requester, msg.sender, _recordId, permission.expiryTime, block.timestamp, "Persetujuan data"
        );
    }

    function revokeDataAccess(address _requester, uint256 _recordId) public {
        bytes32 permissionId = keccak256(abi.encodePacked(_requester, hashRecords[_recordId].owner, _recordId));
        DataPermisson storage permission = dataPermisson[permissionId];

        require(permission.requester != address(0), "Permintaan tidak ada");
        require(msg.sender == permission.owner || msg.sender == permission.requester, "TIdak diizinkan mencabut!");

        permission.isApproved = false;

        emit DataRevoked(permissionId, msg.sender, block.timestamp, "Mencabut izin data");
    }

    function hasPermission(address _requester, address _owner, uint256 _recordId) public view returns (bool) {
        bytes32 permissionId = keccak256(abi.encodePacked(_requester, _owner, _recordId));

        DataPermisson memory permission = dataPermisson[permissionId];

        if (!permission.isApproved) return false;
        if (permission.expiryTime > 0 && block.timestamp > permission.expiryTime) return false;

        return true;
    }

    function getPermission(bytes32 _permissionId)
        public
        view
        returns (
            address requester,
            address owner,
            uint256 recordId,
            bool isApproved,
            uint256 expiryTime,
            uint256 approvedAt,
            string memory purpose
        )
    {
        DataPermisson memory permission = dataPermisson[_permissionId];

        return (
            permission.requester,
            permission.owner,
            permission.recordId,
            permission.isApproved,
            permission.expiryTime,
            permission.approvedAt,
            permission.purpose
        );
    }

    function getMyRequests() public view returns (bytes32[] memory) {
        return userPermissionRequests[msg.sender];
    }

    function getPendingApprovals() public view returns (bytes32[] memory) {
        return userPermissionApprovals[msg.sender];
    }
}
