import { patchData } from "../fetchAPI";

const changeCenterStatus = async (centerId, newStatus) => {
  try {
    if (!centerId) {
      throw new Error('centerId is required');
    }

    const url = `http://localhost:5050/api/v1/center/centers/${centerId}/change-status`;
    const response = await patchData(url, { status: newStatus });
    return response; // Assuming response.data is already parsed in patchData function
  } catch (error) {
    console.error('Error changing center status:', error);
    throw error;
  }
};
export default changeCenterStatus;