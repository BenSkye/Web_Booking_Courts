import { fetchDataMockAPI } from '@/services/fetchAPI';

export const getAllCenterAPI = async () => {
  const data = await fetchDataMockAPI(
    'https://664b5118a300e8795d452247.mockapi.io/centers'
  );
  if (Array.isArray(data)) {
    return data; // Đảm bảo trả về mảng
  } else {
    console.error('Invalid data format:', data);
    return [];
  }
};

export const getCenterByIdAPI = async (id) => {
  const data = await fetchDataMockAPI(
    `https://664b5118a300e8795d452247.mockapi.io/centers/${id}`
  );
  if (data) {
    return data;
  } else {
    console.error('Invalid data format:', data);
    return {};
  }
};
