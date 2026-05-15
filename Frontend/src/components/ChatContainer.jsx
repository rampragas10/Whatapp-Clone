import { useEffect, useRef } from "react";
import { useAuth } from "../hook/useAuth";
import { useMessages } from "../features/message/hook/useMessage";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const { selectedUser, fetchMessages, messages, isMessagesLoading } =
    useMessages();
  const { authUser } = useAuth();
  const messageEndRef = useRef(null);
  const currentUserId = authUser?._id;

  useEffect(() => {
    if (selectedUser?._id) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return null;
  }

  return (
    <>
      <ChatHeader />
      <div className="flex-1 bg-slate-950/95 px-6 py-6 overflow-y-auto no-scrollbar">
        {messages?.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => {
              const isOutgoing = msg.senderId === currentUserId;

              return (
                <div
                  key={msg._id}
                  className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex flex-col ${isOutgoing ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-[28px] px-5 py-4 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.7)] border max-w-[82%] ${
                        isOutgoing
                          ? "bg-slate-100 text-slate-950 border-slate-200/70 rounded-tl-[28px] rounded-bl-[28px] rounded-br-lg"
                          : "bg-slate-900 text-slate-100 border-slate-700/60 rounded-tr-[28px] rounded-br-[28px] rounded-bl-lg"
                      }`}>
                      {msg.image && (
                        <div className="overflow-hidden rounded-3xl border border-slate-700/60 mb-4 bg-slate-950">
                          <img
                            src={msg.image}
                            alt="Shared"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                      {msg.text && (
                        <p className="leading-7 text-sm">{msg.text}</p>
                      )}
                      <div
                        className={`mt-3 text-[11px] opacity-70 ${
                          isOutgoing ? "text-right" : "text-left"
                        }`}>
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder
            name={selectedUser?.fullName || "contact"}
          />
        )}
      </div>
      <MessageInput />
    </>
  );
}
//   const { selectedUser, fetchMessages, messages, isMessagesLoading } =
//     useMessages();
//   const { authUser } = useAuth();
//   const messageEndRef = useRef(null);
//   const currentUserId = authUser?._id;
//   const { selectedUser, fetchMessages, messages, isMessagesLoading } =
//     useMessages();
//   const { authUser } = useAuth();
//   const messageEndRef = useRef(null);
//   const currentUserId = authUser?._id;

//   useEffect(() => {
//     if (selectedUser?._id) {
//       fetchMessages(selectedUser._id);
//     }
//   }, [selectedUser]);

//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (!selectedUser) {
//     return null;
//   }

//   return (
//     <>
//       <ChatHeader />
//       <div className="flex-1 px-6 overflow-y-auto py-8">
//         {messages?.length > 0 && !isMessagesLoading ? (
//           <div className="max-w-3xl mx-auto space-y-6">
//             {messages.map((msg) => (
//               <div
//                 key={msg._id}
//                 className={`chat ${msg.senderId === currentUserId ? "chat-end" : "chat-start"}`}>
//                 <div
//                   className={`chat-bubble relative ${
//                     msg.senderId === currentUserId
//                       ? "bg-cyan-600 text-white"
//                       : "bg-slate-800 text-slate-200"
//                   }`}>
//                   {msg.image && (
//                     <img
//                       src={msg.image}
//                       alt="Shared"
//                       className="rounded-lg h-48 object-cover"
//                     />
//                   )}
//                   {msg.text && <p className="mt-2">{msg.text}</p>}
//                   <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
//                     {new Date(msg.createdAt).toLocaleTimeString(undefined, {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             {/* 👇 scroll target */}
//             <div ref={messageEndRef} />
//           </div>
//         ) : isMessagesLoading ? (
//           <MessagesLoadingSkeleton />
//         ) : (
//           <NoChatHistoryPlaceholder
//             name={selectedUser?.fullName || "contact"}
//           />
//         )}
//       </div>

//       <MessageInput />
//     </>
//   );
// }

export default ChatContainer;
