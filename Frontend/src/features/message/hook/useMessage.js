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

// import { useDispatch, useSelector } from "react-redux";
// import {
//   // getContacts,
//   // getChats,
//   // getMessagesbyId,
//   // sendMessage,
//   // setActiveTab,
//   // setSelectedUser,
//   // toggleSound,
//   // addNewMessage,
//   // clearMessages,
// } from "../state/message.slice";
// import toast from "react-hot-toast";

import {
  getContacts,
  getChats,
  getMessagesbyId,
  sendMessage as sendMessageApi,
} from "../services/message.api";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTab as setActiveTabAction,
  setAllContacts,
  setChats,
  setMessages,
  setSelectedUser,
  toggleSound,
  addNewMessage,
  clearMessages,
} from "../state/message.slice";
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
  } = useSelector((state) => state.message);

  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  // ==============================
  // Get Contacts
  // ==============================

  const fetchContacts = async () => {
    try {
      setIsUsersLoading(true);

      const data = await getContacts();
      dispatch(setAllContacts(data));

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
      dispatch(setChats(data));

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
      dispatch(setMessages(data));

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
  // Toggle Sound
  // ==============================

  const toggleSoundSetting = () => {
    dispatch(toggleSound());
  };

  // ==============================
  // Set Active Tab
  // ==============================

  const setActiveTab = (tab) => {
    dispatch(setActiveTabAction(tab));
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
    toggleSoundSetting,
    setActiveTab,
    removeMessages,
  };
};
