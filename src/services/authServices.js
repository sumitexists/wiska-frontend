import api from "./api";

export const loginService = async (username, password) => {
  try {
    localStorage.removeItem("refreshToken");
    const response = await api.post("/auth/jwt/create/", {
      username,
      password,
    });

    const data = response.data;

    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    const userResponse = await api.get("/auth/users/me/");
    const userData = userResponse.data;
    return userData;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Login failed. Please try again.";
    throw new Error(errorMessage, { cause: error });
  }
};

export const logoutService = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const registerService = async ({
  username,
  email,
  password,
  first_name,
  last_name,
  re_password,
}) => {
  try {
    const reponse = await api.post("/auth/users/", {
      username,
      email,
      password,
      re_password,
      first_name,
      last_name,
    });
    await loginService(username, password);
    return reponse;
  } catch (error) {
    return error.response;
  }
};
