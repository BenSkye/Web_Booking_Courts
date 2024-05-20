import axios from 'axios';

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.data.error === 0) {
      return response.data.data;
    } else {
      console.error('Error fetching data:', response.data.error_text);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return [];
};

export const fetchDistricts = (provinceId) => {
  return fetchData(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
};

export const fetchWards = (districtId) => {
  return fetchData(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
};
