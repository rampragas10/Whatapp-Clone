import { useMessages } from "../features/message/hook/useMessage";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useMessages();

  return (
    <div className="tabs tabs-boxed bg-slate-900/80 p-2 m-2 rounded-xl shadow-inner shadow-cyan-500/10">
      <button
        type="button"
        onClick={() => setActiveTab("chats")}
        aria-pressed={activeTab === "chats"}
        className={`tab transition-colors duration-200 ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400 hover:text-slate-200"
        }`}>
        Chats
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("contacts")}
        aria-pressed={activeTab === "contacts"}
        className={`tab transition-colors duration-200 ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400 hover:text-slate-200"
        }`}>
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
