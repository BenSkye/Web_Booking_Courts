import { fetchDataEsgoo } from '../fetchAPI';

export const getFixedPackageScheduleByIdAPI = async (packageId) => {
  return await fetchDataEsgoo(
    `http://localhost:5050/api/v1/fixed-package-schedule/${packageId}`
  );
};
