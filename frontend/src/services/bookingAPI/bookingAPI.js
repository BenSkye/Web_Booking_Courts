import { fetchData, postData, putData } from "../fetchAPI";
import Cookies from "js-cookie";

export const getBookingIndayCenterAPI = async (day, centerId) => {
  const data = await fetchData(
    "https://664b5118a300e8795d452247.mockapi.io/centers"
  );
  if (Array.isArray(data)) {
    return data; // Đảm bảo trả về mảng
  } else {
    console.error("Invalid data format:", data);
    return [];
  }
};

export const getBookingByInvoiceIdAPI = async (invoiceId) => {
  const response = await fetchData(
    `http://localhost:5050/api/v1/booking/get-booking-by-invoiceId/${invoiceId}`
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};

export const checkBookingAvailablebyDayAPI = async (data) => {
  const response = await postData(
    "http://localhost:5050/api/v1/booking/create-booking-byday",
    data
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === 201) {
    return response.data;
  }
};
export const UpdateBookingIncreasePrice = async (data) => {
  const response = await putData(
    "http://localhost:5050/api/v1/booking/update-booking-byDay-increase-price",
    data
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === 201) {
    return response.data;
  }
};

export const getPersonalBookingAPI = async () => {
  const response = await fetchData(
    "http://localhost:5050/api/v1/booking/get-personal-booking"
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};

export const completeBookingAPI = async (bookingId) => {
  const response = await fetchData(
    `http://localhost:5050/api/v1/booking/completed-booking/${bookingId}`
  );
  console.log("Response:", response);
  if (response.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};
