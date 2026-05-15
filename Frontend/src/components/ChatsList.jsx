import { useEffect } from "react";
import { useMessages } from "../features/message/hook/useMessage";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuth } from "../hook/useAuth";

function ChatsList() {
  const { fetchChats, chats, selectUser, isUsersLoading } = useMessages();
  const { onlineUsers } = useAuth();

  useEffect(() => {
    fetchChats();
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4 cursor-pointer transition hover:border-cyan-500/40 hover:bg-slate-900/95"
          onClick={() => selectUser(chat)}>
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${onlineUsers?.includes(chat._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full overflow-hidden border border-slate-700/40 bg-slate-950">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <div className="min-w-0">
              <h4 className="text-slate-100 font-semibold truncate">
                {chat.fullName}
              </h4>
              <p className="text-slate-400 text-sm truncate">
                Last message preview
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;
