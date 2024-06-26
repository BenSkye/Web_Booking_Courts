import { fetchData } from "../fetchAPI";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const PersonalInformation = async () => {
  try {
    const response = await fetchData(
      `${apiBaseUrl}/user/personal-information`
    );
    console.log("Data from API:", response);
    if (response.status === "success") {
      console.log(" response.data.personal", response.data.personal);
      return response.data.personal; // Trả về mảng các trung tâm nếu thành công
    } else {
      console.error("Request failed with status:", response.status);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};
