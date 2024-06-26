import { fetchData } from "../fetchAPI";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getPersonalInvoiceAPI = async () => {
  const response = await fetchData(
    `${apiBaseUrl}/invoice/get-personal-invoice`
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};
