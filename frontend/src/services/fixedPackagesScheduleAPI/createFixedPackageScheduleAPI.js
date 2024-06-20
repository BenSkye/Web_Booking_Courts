import { postData } from '../fetchAPI';

export const createFixedPackageScheduleAPI = async (data) => {
  const response = await postData(
    'http://localhost:5050/api/v1/fixed-package-schedule',
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
