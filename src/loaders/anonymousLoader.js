import api from "../services/api";

export const fetchAnonymousUser = async () => {
  try {
    const response = await api.get("/accounts/anonymousUser/");
    return response.data;
  } catch (error) {
    console.error("Error fetching anonymous user:", error);
    throw error;
  }
};

export const fetchCommunityDetails = async ({ params }) => {
  try {
    const communityResponse = await api.get(
      `/anonymous/community/${params.communityId}`,
    );
    const posts = await api.get(
      `/anonymous/posts/?community_id=${params.communityId}`,
    );
    return [communityResponse.data, posts.data];
  } catch (error) {
    console.error("Error fetching community details:", error);
    throw error;
  }
};

export const fetchCommunity = async () => {
  try {
    const response = await api.get("/anonymous/community/");
    return response.data;
  } catch (error) {
    console.error("Error fetching community:", error);
    throw error;
  }
};

export const fetchPostDetails = async ({ params }) => {
  try {
    const postResponse = await api.get(`/anonymous/posts/${params.postId}`);
    const commentResponse = await api.get(
      `/anonymous/comments/?post_id=${params.postId}`,
    );
    return [postResponse.data, commentResponse.data];
  } catch (error) {
    console.error("Error fetching post details :", error);
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await api.get("/anonymous/posts/");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchAnonymousUserPostsAndCommunities = async ({ params }) => {
  try {
    const postsResponse = await api.get(
      `/anonymous/posts/?user_id=${params.userId}`,
    );
    const communitiesResponse = await api.get(
      `/anonymous/community/?user_id=${params.userId}`,
    );
    return [postsResponse.data, communitiesResponse.data];
  } catch (error) {
    console.error(
      "Error fetching anonymous user posts and communities:",
      error,
    );
    throw error;
  }
};



