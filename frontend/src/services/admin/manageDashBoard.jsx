import { fetchData } from "../fetchAPI";
// fetchAPI.ts


 const getAllMemberShip = async () => {
  try {
    const response = await fetchData('http://localhost:5050/api/v1/center/admin/Dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
export default getAllMemberShip;
