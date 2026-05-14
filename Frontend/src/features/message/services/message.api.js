import axios from "axios";

const messageApiInstance = axios.create({
  baseURL: "/api/messages",
  withCredentials: true,
});

export const getContacts = async () => {
    const response = await messageApiInstance.post("/contacts");

  return response.data;
};

export const getChats = async () => {
    const response = await messageApiInstance.post("/chats");

  return response.data;
};


export const getMessagesbyId = async ({ userId }) => {
  const response = await messageApiInstance.get(`/${userId}`);
  return response.data;
};

export const sendMessage = async (userId) => {
  const response = await messageApiInstance.post(`/send/${userId}`);
  return response.data;
};

