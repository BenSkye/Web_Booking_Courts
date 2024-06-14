import axios from "axios";
import Cookies from "js-cookie";
let token = Cookies.get("jwtToken");
export const fetchDataEsgoo = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.data.error === 0) {
      return response.data.data;
    } else {
      console.error("Error fetching data:", response.data.error_text);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return [];
};

export const fetchDataMockAPI = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data; // Trả về dữ liệu trực tiếp từ MockAPI
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return [];
};

export const postData = async (url, data) => {
  try {
    if (!token) {
      token = "";
    }
    console.log("Data to post:", data);
    console.log("token:", token);

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      return response;
    } else {
      console.error("Error posting data:", response.status);
    }
  } catch (error) {
    return error.response;
  }
  return null;
};

export const patchData = async (url, data) => {
  try {
    console.log(token);
    if (!token) {
      token = "";
    }
    console.log("Data to patch:", data);
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.error("Error patching data:", response.status);
    }
  } catch (error) {
    return error.response;
  }
  return null;
};
