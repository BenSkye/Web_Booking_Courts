import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const getAllCenterPackage = async (token) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/centerpackage/getAllCenterPackage`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Ensure this returns { status: "success", data: { centerPackages: [...] } }
  } catch (error) {
    console.error("Error fetching center packages:", error);
    throw error;
  }
};

export const selectCenterPackage = async (centerId, packageId, token) => {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/center/my-centers/${centerId}/select-package/${packageId}`,
      {}, // Body của request, nếu có
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Trả về dữ liệu nhận được từ server
  } catch (error) {
    console.error("Error selecting center package:", error);
    throw error;
  }
};

