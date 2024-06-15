import { fetchDataMockAPI } from "../fetchAPI";

export const PersonalInformation=  async () => {
    try {
      const response = await fetchDataMockAPI('http://localhost:5050/api/v1/user/personal-information');
      console.log('Data from API:', response);
      if (response.status === 'success') {
        console.log(' response.data.personal', response.data.personal)
        return response.data.personal; // Trả về mảng các trung tâm nếu thành công
      } else {
        console.error('Request failed with status:', response.status);
        return []; // Trả về mảng rỗng nếu có lỗi
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  };
  