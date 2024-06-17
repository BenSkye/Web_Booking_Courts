import axios from 'axios';

export const createFixedPackageScheduleAPI = {
  createFixedPackageSchedule: async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/v1/fixed-package-schedule',
        data
      );
      if (response.data.status === 'success') {
        return response.data.data.fixedPackageSchedule;
      } else {
        console.error('Request failed with status:', response.data.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
    return null;
  },
};
