import { fetchData } from '../fetchAPI';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getFixedPackageScheduleByIdAPI = async (packageId) => {
  return await fetchData(
    `${apiBaseUrl}/fixed-package-schedule/${packageId}`
  );
};
