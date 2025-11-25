// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {HashStorage} from "../src/HashStorage.sol";

contract HashStorageScript is Script {
    HashStorage public ktpHash;

    function setUp() public {}

    function run() external returns (HashStorage) {
        vm.startBroadcast();

        ktpHash = new HashStorage();

        vm.stopBroadcast();

        return ktpHash;
    }
}
