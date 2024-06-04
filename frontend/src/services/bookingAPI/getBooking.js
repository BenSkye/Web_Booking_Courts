import { fetchDataMockAPI } from "../fetchAPI";

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
