import { fetchData } from "../fetchAPI";

export const getFreeTimeByDateAPI = async (centerId, date) => {
  const response = await fetchData(
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
  const response = await fetchData(
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
  const response = await fetchData(
    `http://localhost:5050/api/v1/timeSlot/find-free-slot-by-center/${centerId}/by-date/${date}/by-start-time/${startTime}/by-duration/${duration}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};

export const getFreeTimeByDateForUpdateAPI = async (
  centerId,
  date,
  oldStart,
  oldEnd,
  courtId
) => {
  const response = await fetchData(
    `http://localhost:5050/api/v1/timeSlot/find-free-slot-by-center-for-update/${centerId}/by-date/${date}/${oldStart}/${oldEnd}/${courtId}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};

export const getAvailableDurationForUpdateAPI = async (
  centerId,
  date,
  startTime,
  oldStart,
  oldEnd,
  courtId
) => {
  const response = await fetchData(
    `http://localhost:5050/api/v1/timeSlot/find-free-slot-by-center-for-update/${centerId}/by-date/${date}/by-start-time/${startTime}/${oldStart}/${oldEnd}/${courtId}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};

export const getAvailableCourtForUpdateAPI = async (
  centerId,
  date,
  startTime,
  duration,
  oldStart,
  oldEnd,
  courtId
) => {
  const response = await fetchData(
    `http://localhost:5050/api/v1/timeSlot/find-free-slot-by-center-for-update/${centerId}/by-date/${date}/by-start-time/${startTime}/by-duration/${duration}/${oldStart}/${oldEnd}/${courtId}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};
export const getPriceFormStartToEnd = async (centerId, startTime, endTime) => {
  const response = await fetchData(
    `http://localhost:5050/api/v1/timeSlot/get-price-from-start-to-end/${centerId}/${startTime}/${endTime}`
  );
  if (response) {
    return response.data;
  } else {
    console.error("Invalid data format:", response);
    return {};
  }
};
