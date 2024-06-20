import { fetchData } from '../fetchAPI';

export const getFixedPackageScheduleByIdAPI = async (packageId) => {
  return await fetchData(
    `http://localhost:5050/api/v1/fixed-package-schedule/${packageId}`
  );
};
