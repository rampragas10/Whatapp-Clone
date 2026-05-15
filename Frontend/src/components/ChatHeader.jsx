import { XIcon } from "lucide-react";
import { useMessages } from "../features/message/hook/useMessage";
import { useEffect } from "react";
import { useAuth } from "../hook/useAuth";

function ChatHeader() {
  const { selectedUser, selectUser } = useMessages();
  const { onlineUsers } = useAuth();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") selectUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [selectUser]);

  if (!selectedUser) return null;

  return (
    <div className="flex justify-between items-center bg-slate-900/90 border-b border-slate-700/70 px-6 py-5 shadow-[0_10px_60px_-50px_rgba(15,23,42,0.9)]">
      <div className="flex items-center gap-4">
        <div className="rounded-full border border-slate-700 bg-slate-950 p-0.5 shadow-inner shadow-slate-950/50">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-100 text-lg font-semibold">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-sm">
            {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => selectUser(null)}
        className="rounded-full border border-slate-700 bg-slate-900/90 p-3 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100">
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
export default ChatHeader;
