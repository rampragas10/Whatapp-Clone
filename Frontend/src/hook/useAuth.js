import { login,register } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    
    password,
    fullname,
   
  }) {
    const data = await register({
      email,
      
      password,
      fullname,
      
    });

    dispatch(setUser(data.user));

    return data.user;
  }

  async function handleLogin({ email, password }) {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
    return data.user;
  }

//   async function handleGetMe() {
//     try {
//       dispatch(setLoading(true));
//       const data = await getMe();
//       dispatch(setUser(data.user));
//     } catch (err) {
//       console.log(err);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }

//   async function handleLogout() {
//     try {
//       dispatch(setLoading(true));
//       await logout();
//       dispatch(setUser(null));
//     } catch (err) {
//       console.log(err);
//       dispatch(setError(err.message || "Logout failed"));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }

  return { handleRegister, handleLogin  };
};
