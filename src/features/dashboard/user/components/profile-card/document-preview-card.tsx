import { ChevronRight, Image } from "lucide-react";
import { UserDocument } from "../../types/user-types";

interface DocumentPreviewCardProps {
  documents: UserDocument[];
}

export function DocumentPreviewCard({ documents }: DocumentPreviewCardProps) {
  const getDocumentLabel = (type: string) => {
    const labels = {
      ktp_front: "KTP Front",
      ktp_back: "KTP Back",
      selfie: "Selfie",
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Your Documents
      </h3>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden border-2 border-blue-200 flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer group"
          >
            <div className="text-center">
              <Image className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-medium text-blue-700">
                {getDocumentLabel(doc.document_type)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-between px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        <span className="text-sm font-medium">View All Documents</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
