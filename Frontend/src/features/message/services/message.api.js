import axios from "axios";

const messageApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/messages",
  withCredentials: true,
});

export const getContacts = async () => {
    const response = await messageApiInstance.get("/contacts");

  return response.data;
};

export const getChats = async () => {
    const response = await messageApiInstance.get("/chats");

  return response.data;
};


export const getMessagesbyId = async ({ userId }) => {
  const response = await messageApiInstance.get(`/${userId}`);
  return response.data;
};

export const sendMessage = async (userId, messageData) => {
  const response = await messageApiInstance.post(`/send/${userId}`, messageData);
  return response.data;
};

