import { useRef, useState } from "react";
import useKeyboardSound from "../utils/KeyboardSound";
import { useMessages } from "../features/message/hook/useMessage";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled, selectedUser } = useMessages();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    try {
      if (!selectedUser?._id) {
        toast.error("No conversation selected");
        return;
      }

      const payload = { text: text.trim(), image: imagePreview };
      console.log("MessageInput: sending payload", {
        to: selectedUser._id,
        hasImage: !!imagePreview,
        imageSize: imagePreview ? imagePreview.length : 0,
      });

      const res = await sendMessage(payload);
      if (res) {
        // clear input only after successful send
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        toast.success("Message sent");
      }
    } catch (err) {
      console.error("Send message error:", err);
      toast.error(err?.response?.data?.message || "Failed to send message");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-5 border-t border-slate-700/60 bg-slate-950/95">
      {imagePreview && (
        <div className="max-w-4xl mx-auto mb-4 overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900 shadow-[0_20px_80px_-45px_rgba(15,23,42,0.75)]">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/90 text-slate-100 border border-slate-700 shadow-lg shadow-slate-900/40 transition hover:bg-slate-800"
              type="button">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="max-w-4xl mx-auto flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-3 shadow-[0_24px_90px_-65px_rgba(2,132,199,0.5)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white">
          <ImageIcon className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none"
          placeholder="Type a message..."
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="flex h-12 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-sky-500 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed">
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;
