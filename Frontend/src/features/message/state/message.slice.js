import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ==============================
// Initial State
// ==============================

const initialState = {
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
};

// ==============================
// Async Thunks
// ==============================

// Note: Async thunks removed - using API services directly in useMessages hook
// for better control over loading states and error handling

// ==============================
// Slice
// ==============================

const messageSlice = createSlice({
  name: "message",
  initialState,

  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    setAllContacts: (state, action) => {
      state.allContacts = action.payload;
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setisUsersLoading: (state, action) => {
      state.isUsersLoading = action.payload;
    },
    setisMessagesLoading: (state, action) => {
      state.isMessagesLoading = action.payload;
    },

    toggleSound: (state) => {
      state.isSoundEnabled = !state.isSoundEnabled;

      localStorage.setItem(
        "isSoundEnabled",
        JSON.stringify(state.isSoundEnabled),
      );
    },

    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },

  // extraReducers: (builder) => {
  //   // Loading states are managed by useMessages hook
  //   // No async thunk handlers needed
  // },
});

export const {
  setActiveTab,
  setAllContacts,
  setChats,
  setMessages,
  setSelectedUser,
  toggleSound,
  addNewMessage,
  clearMessages,
  setisUsersLoading,
  setisMessagesLoading,
  
} = messageSlice.actions;

export default messageSlice.reducer;
