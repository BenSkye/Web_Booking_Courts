import axios from "axios";

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
    const response = await axios.post(url, data);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error posting data:", response.status);
    }
  } catch (error) {
    console.error("Error posting data:", error.message);
  }
  return null;
};
