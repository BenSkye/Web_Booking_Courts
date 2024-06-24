import { postData } from '../fetchAPI';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const createFixedPackageScheduleAPI = async (data) => {
  const response = await postData(
    `${apiBaseUrl}/fixed-package-schedule`,
    data
  );
  console.log('Response:', response);
  if (response.data.status === 'fail') {
    return response.data;
  }
  if (response.status === 201) {
    return response.data;
  }
};
