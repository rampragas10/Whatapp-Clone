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

// export const getAllContacts = createAsyncThunk(
//   "messages/getAllContacts",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get("/messages/contacts");
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch contacts",
//       );
//     }
//   },
// );

// export const getMyChatPartners = createAsyncThunk(
//   "messages/getMyChatPartners",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get("/messages/chats");
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch chats",
//       );
//     }
//   },
// );

// export const getMessagesByUserId = createAsyncThunk(
//   "messages/getMessagesByUserId",
//   async (userId, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(`/messages/${userId}`);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch messages",
//       );
//     }
//   },
// );

// export const sendMessage = createAsyncThunk(
//   "messages/sendMessage",
//   async (messageData, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();

//       const selectedUser = state.messages.selectedUser;

//       const res = await axiosInstance.post(
//         `/messages/send/${selectedUser._id}`,
//         messageData,
//       );

//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to send message",
//       );
//     }
//   },
// );

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

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
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

  extraReducers: (builder) => {
    builder

      // ======================
      // Get Contacts
      // ======================

      .addCase(getAllContacts.pending, (state) => {
        state.isUsersLoading = true;
      })

      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.allContacts = action.payload;
      })

      .addCase(getAllContacts.rejected, (state, action) => {
        state.isUsersLoading = false;
        toast.error(action.payload);
      })

      // ======================
      // Get Chats
      // ======================

      .addCase(getMyChatPartners.pending, (state) => {
        state.isUsersLoading = true;
      })

      .addCase(getMyChatPartners.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.chats = action.payload;
      })

      .addCase(getMyChatPartners.rejected, (state, action) => {
        state.isUsersLoading = false;
        toast.error(action.payload);
      })

      // ======================
      // Get Messages
      // ======================

      .addCase(getMessagesByUserId.pending, (state) => {
        state.isMessagesLoading = true;
      })

      .addCase(getMessagesByUserId.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })

      .addCase(getMessagesByUserId.rejected, (state, action) => {
        state.isMessagesLoading = false;
        toast.error(action.payload);
      })

      // ======================
      // Send Message
      // ======================

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })

      .addCase(sendMessage.rejected, (_, action) => {
        toast.error(action.payload);
      });
  },  

});

export const {
  setActiveTab,
  setSelectedUser,
  toggleSound,
  addNewMessage,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
