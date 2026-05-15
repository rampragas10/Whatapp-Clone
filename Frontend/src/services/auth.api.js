import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register({
  email,
 
  password,
  fullName,
 
}) {
  const response = await authApiInstance.post("/register", {
    email,
   
    password,
    fullName,
    
  });
  return response.data;
}

export async function login({ email, password }) {
  const response = await authApiInstance.post("/login", {
    email,
    password,
  });

  return response.data;
}

export async function updateProfile({ profilePic }) {
  const response = await authApiInstance.put("/update-profile", {
    profilePic
  });

  return response.data;
}

export async function logout() {
  const response = await authApiInstance.post("/logout");

  return response.data;
}

export async function getMe() {
  const response = await authApiInstance.get("/check");

  return response.data;
}


