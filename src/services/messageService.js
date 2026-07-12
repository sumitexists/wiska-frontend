import api from "./api";

export const getMessages = async ({ params }) => {
  try {
    const response = await api.get(
      `/private/messages?contact_id=${params.contactId}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async ({ content, receiver }) => {
  try {
    // receiver should be the user ID (integer)
    const response = await api.post("/private/messages/", {
      content: content,
      receiver: parseInt(receiver), // Ensure it's an integer
    });
    console.log("Message sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
