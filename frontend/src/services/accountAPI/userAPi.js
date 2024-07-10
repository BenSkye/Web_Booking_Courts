import { postData } from "../fetchAPI";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const checkEmailExistence = async (email) => {
  const response = await postData(`${apiBaseUrl}/user/check-email-exist`, {
    email,
  });
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.data.status === "success") {
    return response.data;
  }
};
