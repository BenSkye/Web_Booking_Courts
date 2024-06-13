import { fetchDataMockAPI, postData } from "../fetchAPI";
import Cookies from "js-cookie";

export const getBookingIndayCenterAPI = async (day, centerId) => {
  const data = await fetchDataMockAPI(
    "https://664b5118a300e8795d452247.mockapi.io/centers"
  );
  if (Array.isArray(data)) {
    return data; // Đảm bảo trả về mảng
  } else {
    console.error("Invalid data format:", data);
    return [];
  }
};

export const checkBookingAvailablebyDayAPI = async (data) => {
  const response = await postData(
    "http://localhost:5050/api/v1/booking/create-booking-byday",
    data
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === 201) {
    return response.data;
  }
};
