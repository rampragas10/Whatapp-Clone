import {
  login,
  register,
  logout as logoutApi,
  updateProfile as updateProfileApi,
  getMe as getMeAPI,
} from "../services/auth.api";
import { useDispatch, useSelector } from "react-redux";
import {
  setauthUser,
  setisCheckingAuth,
  setisSigningUp,
  setisLoggingIn,
  setsocket,
  setonlineUsers,
} from "../state/auth.slice";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    authUser,
    isCheckingAuth,
    isSigningUp,
    isLoggingIn,
    socket,
    onlineUsers,
  } = useSelector((state) => state.auth);

  // ==============================
  // Register
  // ==============================

  async function handleRegister({ email, password, fullName }) {
    try {
      dispatch(setisSigningUp(true));
      const data = await register({
        email,
        password,
        fullName,
      });

      dispatch(setauthUser(data.user));
      dispatch(connectSocket());
      toast.success("Registration successful!");
      return data.user;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
      throw err;
    } finally {
      dispatch(setisSigningUp(false));
    }
  }

  // ==============================
  // Login
  // ==============================

  async function handleLogin({ email, password }) {
    try {
      dispatch(setisLoggingIn(true));
      const data = await login({ email, password });
      dispatch(setauthUser(data.user));
      dispatch(connectSocket());
      toast.success("Login successful!");
      return data.user;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      throw err;
    } finally {
      dispatch(setisLoggingIn(false));
    }
  }

  // ==============================
  // Update Profile
  // ==============================

  async function updateProfile(profileData) {
    try {
      const data = await updateProfileApi(profileData);
      dispatch(setauthUser(data));
      toast.success("Profile updated successfully!");
      return data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Profile update failed";
      toast.error(errorMessage);
      throw err;
    }
  }

  // ==============================
  // Logout
  // ==============================

  async function handleLogout() {
    try {
      await logoutApi();
      dispatch(setauthUser(null));
      dispatch(disconnectSocket());
      toast.success("Logged out successfully!");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
      throw err;
    }
  }

  const getMe = async () => {
    try {
      dispatch(setisCheckingAuth(true));
      const data = await getMeAPI();
      const user = data?.user || data;
      dispatch(setauthUser(user));
      if (user) {
        dispatch(connectSocket());
      }
      console.log("Authenticated user:", user);
      console.log("Socket state after authentication:", socket);
      return user;
    } catch (err) {
      dispatch(setauthUser(null));
      throw err;
    } finally {
      dispatch(setisCheckingAuth(false));
    }
  };

  const connectSocket = () => (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      withCredentials: true,
    });

    newSocket.connect();

    dispatch(setsocket(newSocket));

    newSocket.on("getOnlineUsers", (userIds) => {
      dispatch(setonlineUsers(userIds));
    });
  };

  const disconnectSocket = () => (dispatch, getState) => {
    const { socket } = getState().auth;

    if (socket?.connected) {
      socket.disconnect();
    }

    dispatch(setsocket(null));
  };

  return {
    authUser,
    isCheckingAuth,
    isSigningUp,
    isLoggingIn,
    socket,
    onlineUsers,
    handleRegister,
    handleLogin,
    handleLogout,
    updateProfile,
    getMe,
  };
};
