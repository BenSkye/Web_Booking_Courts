import { fetchDataMockAPI } from '@/services/fetchAPI';

export const getListCourtsByCenterId_API = async (id) => {
  const data = await fetchDataMockAPI(
    `http://localhost:5050/api/v1/court/get-court-by-centerId/${id}`
  );
  if (data.status === 'success' && Array.isArray(data.data.courts)) {
    return data.data.courts; // Return the courts array if the data format is correct
  } else {
    console.error('Invalid data format:', data);
    return []; // Return an empty array if the data format is not as expected
  }
};
