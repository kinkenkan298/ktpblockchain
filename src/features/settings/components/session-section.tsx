// features/settings/SessionSection.tsx
import { useEffect, useState } from "react";
import { Laptop, Smartphone, Trash2, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { SettingsCard } from "@/components/settings-card";

interface Session {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  userAgent?: string;
  ipAddress?: string;
  token?: string;
  isCurrent?: boolean;
}

export function SessionSection() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await authClient.listSessions();

        if (data) {
          setSessions(data as Session[]);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleRevoke = async (token: string, sessionId: string) => {
    setIsRevoking(sessionId);
    try {
      await authClient.revokeSession({ token });
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (error) {
      alert("Failed to revoke session");
    } finally {
      setIsRevoking(null);
    }
  };

  return (
    <SettingsCard
      title="Active Sessions"
      description="Manage devices where you're currently logged in."
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No active sessions found.
          </p>
        ) : (
          sessions.map((session) => {
            const isMobile = session.userAgent
              ?.toLowerCase()
              .includes("mobile");

            return (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border rounded-md text-gray-600">
                    {isMobile ? (
                      <Smartphone className="w-5 h-5" />
                    ) : (
                      <Laptop className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {isMobile ? "Mobile Device" : "Desktop Device"}
                      </p>
                      {session.isCurrent && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                          THIS DEVICE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {session.ipAddress || "Unknown IP"} •{" "}
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    session.token && handleRevoke(session.token, session.id)
                  }
                  disabled={isRevoking === session.id || !session.token}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all disabled:opacity-50"
                  title="Revoke Session"
                >
                  {isRevoking === session.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </SettingsCard>
  );
}
