import api from "../services/api";

export const userLoader = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  // If there is no refresh token, don't bother hitting the API.
  if (!refreshToken || !accessToken) {
    return null;
  }

  try {
    const response = await api.get("/auth/users/me/");
    return { user: response.data, token: accessToken };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        // 3. Attempt to fetch a new access token
        const refreshResponse = await api.post("/auth/jwt/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", refreshResponse.data.access);
        // Note: Djoser only returns a new refresh token if ROTATE_REFRESH_TOKENS is true
        if (refreshResponse.data.refresh) {
          localStorage.setItem("refreshToken", refreshResponse.data.refresh);
        }

        const retryResponse = await api.get("/auth/users/me/");

        return {
          user: retryResponse.data,
          token: refreshResponse.data.access,
        };
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
      }
    }

    // Wipe storage for other unhandled structural errors
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};
