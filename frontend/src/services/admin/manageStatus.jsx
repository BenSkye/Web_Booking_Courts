import { patchData } from "../fetchAPI";

const changeCenterStatus = async (centerId, newStatus, deniedReason = '') => {
  try {
    if (!centerId) {
      throw new Error('centerId is required');
    }

    const url = `http://localhost:5050/api/v1/center/centers/${centerId}/change-status`;
    const requestBody = { 
      status: newStatus 
    };

    // Include the denied reason if the new status is "rejected"
    if (newStatus === 'rejected') {
      requestBody.denied = deniedReason;
    }

    const response = await patchData(url, requestBody); // Include 'denied' in the request body

    console.log('Response from server:', response); // Log the response to see if it contains any errors

    return response; // Assuming response.data is already parsed in patchData function
  } catch (error) {
    console.error('Error changing center status:', error);
    throw error;
  }
};

export default changeCenterStatus;
