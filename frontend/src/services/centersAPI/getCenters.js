import { fetchData } from "@/services/fetchAPI";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const getAllCenterAPI = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/center`);
    const responseData = await response.json();
    console.log("Data from API:", responseData);
    if (responseData.status === "success") {
      return responseData.data.centers; // Trả về mảng các trung tâm nếu thành công
    } else {
      console.error("Request failed with status:", responseData.status);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

export const getCenterByIdAPI = async (id) => {
  const data = await fetchData(`${apiBaseUrl}/center/${id}`);
  if (data) {
    return data;
  } else {
    console.error("Invalid data format:", data);
    return {};
  }
};

export const getAPriceByCenterIdAPIAndScheduleType = async (
  id,
  scheduleType
) => {
  const data = await fetchData(
    `${apiBaseUrl}/price/center/${id}/schedule-type/${scheduleType}`
  );
  if (data.status === "success" && data.data.price) {
    return data.data.price;
  } else {
    console.error("Invalid data format:", data);
    return {};
  }
};

export async function updateCenter(centerId, data, token) {
  try {
    const url = `${apiBaseUrl}/center/my-centers/update/${centerId}`;
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cập nhật thành công:", response.data);
  } catch (error) {
    console.error(
      "Lỗi khi cập nhật trung tâm:",
      error.response ? error.response.data : error.message
    );
  }
}

export const getCenterPackageByInvoiceIdAPI = async (invoiceId) => {
  const response = await fetchData(
    `${apiBaseUrl}/center/get-center-Package-by-invoice/${invoiceId}`
  );
  console.log("Response:", response);
  if (response.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};
