import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const getAllCenterPackage = async (token) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/centerpackage/getAllCenterPackage`,
      {
        headers: {
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

export default getAllCenterPackage;
