import { fetchData } from "@/services/fetchAPI";

export const getAllCenterAPI = async () => {
  try {
    const response = await fetch("http://localhost:5050/api/v1/center");
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
  const data = await fetchData(`http://localhost:5050/api/v1/center/${id}`);
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
    `http://localhost:5050/api/v1/price/center/${id}/schedule-type/${scheduleType}`
  );
  if (data.status === "success" && data.data.price) {
    return data.data.price;
  } else {
    console.error("Invalid data format:", data);
    return {};
  }
};
