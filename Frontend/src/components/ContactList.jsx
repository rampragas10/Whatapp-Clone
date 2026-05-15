import { useEffect } from "react";
import { useMessages } from "../features/message/hook/useMessage";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuth } from "../hook/useAuth";

function ContactList() {
  const { fetchContacts, allContacts, selectUser, isUsersLoading } =
    useMessages();
  const { onlineUsers } = useAuth();

  useEffect(() => {
    fetchContacts();
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4 cursor-pointer transition hover:border-cyan-500/40 hover:bg-slate-900/95"
          onClick={() => selectUser(contact)}>
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${onlineUsers?.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full overflow-hidden border border-slate-700/40 bg-slate-950">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold">
                {contact.fullName}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
