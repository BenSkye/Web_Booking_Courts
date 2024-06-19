import axios from "axios";

const getAllCenterPackage = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:5050/api/v1/centerpackage/getAllCenterPackage",
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
