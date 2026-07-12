import api from "../services/api";

export const fetchPendingFriendRequests = async () => {
  try {
    const response = await api.get("/private/contacts/pendingRequests/");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending friend requests:", error);
    throw error;
  }
};
