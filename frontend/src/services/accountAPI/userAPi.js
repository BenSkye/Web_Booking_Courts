import { fetchData, postData, putData } from "../fetchAPI";

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

export const checkUserHavePhone = async () => {
  const response = await fetchData(`${apiBaseUrl}/user/check-phone-exist`);
  console.log("Response:", response);
  return response.data;
};
export const updatePhone = async (phone) => {
  const response = await putData(`${apiBaseUrl}/user/update-phone`, {
    phone,
  });
  console.log("Response:", response);
  return response.data;
};
