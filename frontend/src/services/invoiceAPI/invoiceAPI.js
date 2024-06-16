import { fetchData } from "../fetchAPI";

export const getPersonalInvoiceAPI = async () => {
  const response = await fetchData(
    "http://localhost:5050/api/v1/invoice/get-personal-invoice"
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};
