import { useEffect, useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { useMessages } from "../features/message/hook/useMessage";
import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");
// const dispatch = useDispatch();

function ProfileHeader() {
  const { handleLogout, authUser, updateProfile } = useAuth();
  const { isSoundEnabled, toggleSoundSetting } = useMessages();
  const [selectedImg, setSelectedImg] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(
    authUser?.profilePic?.trim() ? authUser.profilePic : "/avatar.png",
  );

  const fileInputRef = useRef(null);

  useEffect(() => {
    setProfileImageUrl(
      authUser?.profilePic?.trim() ? authUser.profilePic : "/avatar.png",
    );
  }, [authUser?.profilePic]);

  const displayName =
    authUser?.fullName || authUser?.name || authUser?.full_name || "User";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        const updatedUser = await updateProfile({ profilePic: base64Image });
        setProfileImageUrl(updatedUser?.profilePic || profileImageUrl);
        setSelectedImg(null);
        toast.success("Profile image updated successfully.");
      } catch (error) {
        toast.error("Failed to upload profile image.");
      }
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="w-14 h-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}>
              <img
                src={selectedImg || profileImageUrl || "/avatar.png"}
                alt={displayName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-45 truncate">
              {displayName}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={handleLogout}>
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSoundSetting();
            }}>
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
