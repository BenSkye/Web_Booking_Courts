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

export const postData = async (url, data, token) => {
  try {
    console.log("Data to post:", data);
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    if (response.status === 201) {
      return response;
    } else {
      console.error("Error posting data:", response.status);
    }
  } catch (error) {
    console.error("Error posting data:", error.message);
  }
  return null;
};

export const patchData = async (url, data, token) => {
  try {
    console.log("Data to patch:", data);
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);

    // Kiểm tra trạng thái HTTP của phản hồi
    if (response.status === 200) {
      return response.data; // Trả về dữ liệu của phản hồi
    } else {
      console.error(
        "Error patching data:",
        response.status,
        response.statusText
      );
      return null; // Trả về null nếu có lỗi nhưng không ném lỗi
    }
  } catch (error) {
    console.error("Error patching data:", error.message);
    return null; // Trả về null nếu có lỗi
  }
};
