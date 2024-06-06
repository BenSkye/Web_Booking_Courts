import { fetchDataEsgoo } from '@/services/fetchAPI';

export const fetchDistricts = (provinceId) => {
  return fetchDataEsgoo(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
};

export const fetchWards = (districtId) => {
  return fetchDataEsgoo(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
};