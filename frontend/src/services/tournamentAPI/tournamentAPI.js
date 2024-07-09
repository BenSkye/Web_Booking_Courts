import { fetchData } from "@/services/fetchAPI";
import { postData, putData } from "../fetchAPI";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllTournamentAPI = async () => {
  const response = await fetchData(`${apiBaseUrl}/tournament/all-tournaments`);
  console.log("Response:", response);
  const data = response.data.tournaments;
  if (Array.isArray(data)) {
    // Filter to include only completed tournaments
    const filteredData = data.filter(
      (tournament) => tournament.status === "completed"
    );
    // Sorting is not necessary as all filtered tournaments have the same status ("completed")
    return filteredData;
  } else {
    console.error("Invalid data format:", data);
    return [];
  }
};

export const getPersonalTournamentAPI = async () => {
  const response = await fetchData(
    `${apiBaseUrl}/tournament/personal-tournaments`
  );
  console.log("Response:", response);
  const data = response.data.tournaments;
  if (response.status === "success") {
    if (Array.isArray(data)) {
      const statusOrder = [
        "confirm",
        "approved",
        "pending",
        "completed",
        "denied",
        "cancelled",
      ];
      const sortedData = data.sort((a, b) => {
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
      return sortedData;
    } else {
      console.error("Invalid data format:", data);
      return [];
    }
  } else {
    console.error("Invalid data format:", data);
    return [];
  }
};

export const getTournamentAPI = async (id) => {
  const response = await fetchData(`${apiBaseUrl}/tournament/${id}`);
  console.log("Response:", response);
  if (response.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};

export const createTournamentAPI = async (data) => {
  const response = await postData(
    `${apiBaseUrl}/tournament/create-tournament`,
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

export const approvedTournamentAPI = async (id, pricePerDay) => {
  const response = await putData(
    `${apiBaseUrl}/tournament/approved-tournament/${id}`,
    pricePerDay
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === 201) {
    return response.data;
  }
};

export const deniedTournamentAPI = async (id) => {
  const response = await putData(
    `${apiBaseUrl}/tournament/denied-tournament/${id}`
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === 201) {
    return response.data;
  }
};

export const getTournamentInCenterAPI = async (centerId) => {
  const response = await fetchData(
    `${apiBaseUrl}/tournament/tournament-in-center/${centerId}`
  );
  console.log("Response:", response);
  if (response.status === "fail") {
    return response.data;
  }
  if (response.status === "success") {
    return response.data;
  }
};

export const cancelBookingAndApproveTournamentAPI = async (
  id,
  { pricePerDay, totalAmount, listBookingId }
) => {
  const response = await putData(
    `${apiBaseUrl}/tournament/cancel-booking-and-approved-tournament/${id}`,
    { pricePerDay, totalAmount, listBookingId }
  );
  console.log("Response:", response);
  if (response.data.status === "fail") {
    return response.data;
  }
  if (response.status === 201) {
    return response.data;
  }
};
