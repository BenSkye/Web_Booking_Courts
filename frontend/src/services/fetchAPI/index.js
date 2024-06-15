import axios from "axios";
import Cookies from "js-cookie";
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

export const fetchData = async (url) => {
  try {
    let token = Cookies.get("jwtToken");
    if (!token) {
      token = "";
    }
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return [];
};

export const postData = async (url, data) => {
  try {
    let token = Cookies.get("jwtToken");
    if (!token) {
      token = "";
    }

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
    let token = Cookies.get("jwtToken");
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
