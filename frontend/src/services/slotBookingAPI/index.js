import { fetchDataMockAPI } from "../fetchAPI";

export const getFreeTimeByDateAPI = async (centerId, date) => {
  const response = await fetchDataMockAPI(
    `http://localhost:5050/api/v1/timeSlot/find-free-slot-by-center/${centerId}/by-date/${date}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};

export const getAvailableDurationAPI = async (centerId, date, startTime) => {
  const response = await fetchDataMockAPI(
    `http://localhost:5050/api/v1/timeSlot/find-free-slot-by-center/${centerId}/by-date/${date}/by-start-time/${startTime}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};
export const getAvailableCourtAPI = async (
  centerId,
  date,
  startTime,
  duration
) => {
  const response = await fetchDataMockAPI(
    `http://localhost:5050/api/v1/timeSlot/find-free-slot-by-center/${centerId}/by-date/${date}/by-start-time/${startTime}/by-duration/${duration}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};
