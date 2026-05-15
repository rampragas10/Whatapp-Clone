import { useEffect } from "react";
import { useMessages } from "../features/message/hook/useMessage";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const { fetchContacts, allContacts, selectUser, isUsersLoading } = useMessages();

  useEffect(() => {
    fetchContacts();
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => selectUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
