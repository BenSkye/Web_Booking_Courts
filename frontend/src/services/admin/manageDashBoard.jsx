import { fetchData } from "../fetchAPI";
// fetchAPI.ts
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const getAllMemberShip = async () => {
  try {
    const response = await fetchData(`${apiBaseUrl}/center/admin/Dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
export default getAllMemberShip;
