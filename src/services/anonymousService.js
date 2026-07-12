import api from "./api";

export const postComment = async ({ comment, postId }) => {
  try {
    const response = await api.post("/anonymous/comments/", {
      post: parseInt(postId),
      content: comment,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error in posting comment", error);
  }
};

export const postLike = async ({ postId }) => {
  try {
    const response = await api.post("/anonymous/likes/", {
      post: parseInt(postId),
    });
    return response.data;
  } catch (error) {
    console.log("Error in posting like", error);
  }
};

export const deleteLike = async ({ likeId }) => {
  try {
    const response = await api.delete(`/anonymous/likes/${likeId}/`);
    return true;
  } catch (error) {
    console.log("Error in deleting like", error);
    return false;
  }
};

export const joinCommunity = async ({ communityId }) => {
  try {
    const response = await api.post("/anonymous/following/", {
      community: parseInt(communityId),
    });
    return response.data;
  } catch (error) {
    console.log("Error in joining community", error);
  }
};

export const leaveCommunity = async ({ followingId }) => {
  try {
    const response = await api.delete(`/anonymous/following/${followingId}/`);
    return response.data;
  } catch (error) {
    console.log("Error in leaving community", error);
    return false;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/anonymous/posts/${postId}/`);
    return true;
  } catch (error) {
    console.log("Error in deleting post", error);
    return false;
  }
};

export const listCommunities = async (userId) => {
  try {
    const response = await api.get(`/anonymous/community/?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error in listing communities", error);
    throw error;
  }
};

export const createPost = async ({ title, content, community }) => {
  try {
    const response = await api.post("/anonymous/posts/", {
      title,
      content,
      community: parseInt(community),
    });
  } catch (error) {
    console.log("Error in creating post", error.response.data);
    throw error;
  }
};

export const createCommunity = async ({ name, description }) => {
  try {
    const response = await api.post("/anonymous/community/", {
      name,
      description,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchPosts = async (searchQuery) => {
  try {
    const response = await api.get(`/anonymous/posts/?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};

export const searchCommunity = async (searchQuery) => {
  try {
    const response = await api.get(`/anonymous/community/?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error searching communities:", error);
    throw error;
  }
};

