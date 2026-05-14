// import { useDispatch, useSelector } from "react-redux";

// import {
//   getAllContacts,
//   getMyChatPartners,
//   getMessagesByUserId,
//   sendMessage,
//   setActiveTab,
//   setSelectedUser,
//   toggleSound,
//   addNewMessage,
//   clearMessages,
// } from "../redux/message.slice";

// export const useMessage = () => {
//   const dispatch = useDispatch();

//   const messageState = useSelector((state) => state.messages);

//   return {
//     ...messageState,

//     getAllContacts: () => dispatch(getAllContacts()),

//     getMyChatPartners: () => dispatch(getMyChatPartners()),

//     getMessagesByUserId: (userId) => dispatch(getMessagesByUserId(userId)),

//     sendMessage: (messageData) => dispatch(sendMessage(messageData)),

//     setActiveTab: (tab) => dispatch(setActiveTab(tab)),

//     setSelectedUser: (user) => dispatch(setSelectedUser(user)),

//     toggleSound: () => dispatch(toggleSound()),

//     addNewMessage: (message) => dispatch(addNewMessage(message)),

//     clearMessages: () => dispatch(clearMessages()),
//   };
// };

import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedUser,
  addNewMessage,
  clearMessages,
} from "../store/messageSlice";

import {
  getContacts,
  getChats,
  getMessagesbyId,
  sendMessage as sendMessageApi,
} from "../api/messageApi";

import toast from "react-hot-toast";
import { useState } from "react";

export const useMessages = () => {
  const dispatch = useDispatch();

  const {
    allContacts,
    chats,
    messages,
    selectedUser,
    activeTab,
    isSoundEnabled,
  } = useSelector((state) => state.messages);

  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  // ==============================
  // Get Contacts
  // ==============================

  const fetchContacts = async () => {
    try {
      setIsUsersLoading(true);

      const data = await getContacts();

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch contacts");
    } finally {
      setIsUsersLoading(false);
    }
  };

  // ==============================
  // Get Chats
  // ==============================

  const fetchChats = async () => {
    try {
      setIsUsersLoading(true);

      const data = await getChats();

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch chats");
    } finally {
      setIsUsersLoading(false);
    }
  };

  // ==============================
  // Get Messages
  // ==============================

  const fetchMessages = async (userId) => {
    try {
      setIsMessagesLoading(true);

      const data = await getMessagesbyId({ userId });

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      setIsMessagesLoading(false);
    }
  };

  // ==============================
  // Send Message
  // ==============================

  const sendMessage = async (messageData) => {
    try {
      if (!selectedUser?._id) return;

      const data = await sendMessageApi(selectedUser._id, messageData);

      dispatch(addNewMessage(data));

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  };

  // ==============================
  // Select User
  // ==============================

  const selectUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  // ==============================
  // Clear Messages
  // ==============================

  const removeMessages = () => {
    dispatch(clearMessages());
  };

  return {
    // state
    allContacts,
    chats,
    messages,
    selectedUser,
    activeTab,
    isSoundEnabled,

    // loading
    isUsersLoading,
    isMessagesLoading,

    // actions
    fetchContacts,
    fetchChats,
    fetchMessages,
    sendMessage,
    selectUser,
    removeMessages,
  };
};