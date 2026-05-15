import { login, register, logout as logoutAPI, updateProfile as updateProfileAPI } from "../services/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../state/auth.slice";
import toast from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user: authUser, loading, error } = useSelector((state) => state.auth);

  // ==============================
  // Register
  // ==============================

  async function handleRegister({
    email,
    password,
    fullName,
  }) {
    try {
      dispatch(setLoading(true));
      const data = await register({
        email,
        password,
        fullName,
      });

      dispatch(setUser(data.user));
      toast.success("Registration successful!");
      return data.user;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Registration failed";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  // ==============================
  // Login
  // ==============================

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      toast.success("Login successful!");
      return data.user;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Login failed";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  // ==============================
  // Update Profile
  // ==============================

  async function updateProfile(profileData) {
    try {
      dispatch(setLoading(true));
      const data = await updateProfileAPI(profileData);
      dispatch(setUser(data.user));
      toast.success("Profile updated successfully!");
      return data.user;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Profile update failed";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  // ==============================
  // Logout
  // ==============================

  async function logout() {
    try {
      dispatch(setLoading(true));
      await logoutAPI();
      dispatch(setUser(null));
      toast.success("Logged out successfully!");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Logout failed";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    authUser,
    loading,
    error,
    handleRegister,
    handleLogin,
    logout,
    updateProfile,
  };
};
