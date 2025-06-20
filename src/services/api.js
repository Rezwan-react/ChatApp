import axios from "axios";

// ============================= axios part start
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
})
// ============================== authServices part start
export const authServices = {
  registration: async (userData) => {
    const res = await api.post("/auth/registration", userData);
    return res.data;
  },
  verifyOtp: async (email, otp) => {
    const res = await api.post("/auth/verifyemail", { email, otp })
    return res.data;
  },
  loginUser: async (userData) => {
    const res = await api.post("/auth/login", userData);
    if (res.data.accessToken) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
    }
    return res.data;
  },
  updateUser: async (fullName, password, avatar) => {
    const res = await api.post("/auth/update", { fullName, password, avatar }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data;
  },
};
// =============================== chatServices part start
export const chatServices = {
  ConversationList: async () => {
    const res = await api.get("/chat/conversationlist");
    return res.data;
  },
  AddCon: async (participentEmail) => {
    const res = await api.post("/chat/createconversation", { participentEmail });
    return res.data;
  },
  getMessages: async (conversationID) => {
    const res = await api.get(`/chat/getMessages/${conversationID}`);
    return res.data;
  },
  sendmessage: async (data) => {
    const { content, reciverId, conversationId } = data;
    const res = await api.post("/chat/send", {
      reciverId, content, conversationId
    });
    return res.data;
  }
};
