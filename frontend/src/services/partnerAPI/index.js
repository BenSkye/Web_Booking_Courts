import axios from "axios";
import { useParams } from "react-router-dom";

// Hàm này sẽ gửi dữ liệu từ form đến API
// export async function submitForm(data) {
//   try {
//     const response = await axios.post(
//       "https://65b61de2da3a3c16ab003ad9.mockapi.io/courtManager",
//       data
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }
// In partnerAPI/index.js
export const submitForm = async (formValues, token) => {
  const response = await fetch('http://localhost:5050/api/v1/center', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add this line
    },
    body: JSON.stringify(formValues)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};



export async function getFormDataAPI() {
  try {
    const response = await axios.get(
      "https://65b61de2da3a3c16ab003ad9.mockapi.io/courtManager"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFormDataByIdAPI(id) {
  try {
    const response = await axios.get(
      `https://65b61de2da3a3c16ab003ad9.mockapi.io/courtManager/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API Call Error: ", error);
    return {};
  }
}
