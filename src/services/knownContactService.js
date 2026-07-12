import api from "./api";

export const knownContactService = async () => {
  const response = await api.get("/private/contacts/");
  return response.data;
};

export const addKnownContactService = async (contactId) => {
  try {
    const response = await api.post("/private/contacts/", {
      contact: parseInt(contactId),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding known contact:", error);
  }
};

export const removeKnownContactService = async (contactId) => {
  try {
    const response = await api.post(`/private/contacts/deleteContact/`, {
      contact: parseInt(contactId),
    });
    return response.data;
  } catch (error) {
    console.error("Error removing known contact:", error);
  }
};

export const updateFriendStatusService = async (contactId, status) => {
  try {
    const response = await api.post(`/private/contacts/updateStatus/`, {
      contact: parseInt(contactId),
      status: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating friend status:", error);
  }
};

export const searchFriendService = async (query) => {
  try {
    const response = await api.get(`/private/search-users?search=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching friends:", error);
  }
};
