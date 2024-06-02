import { fetchDataMockAPI } from '@/services/fetchAPI';

const BASE_URL = 'https://65e2a25ca8583365b3185a86.mockapi.io';

const AccountInformation = async (id) => {
    

  const url = `${BASE_URL}/account_Information/${id}`;
  return await fetchDataMockAPI(url);
};

const updateAccountInformation = async (id, newData) => {
  

  const url = `${BASE_URL}/account_Information/${id}`;
  return await fetchDataMockAPI(url, {
    method: 'PUT',
    data: newData
  });
};

export { AccountInformation, updateAccountInformation };
