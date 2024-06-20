import { fetchData } from "@/services/fetchAPI";
import { postData } from "../fetchAPI";

export const getAllTournamentAPI = async () => {
  const data = await fetchData(
    "https://664e992dfafad45dfae087c5.mockapi.io/Tournament"
  );
  if (Array.isArray(data)) {
    const filteredData = data.filter(
      (tournament) =>
        tournament.status === "Completed" || tournament.status === "Ongoing"
    );
    const sortedData = filteredData.sort((a, b) =>
      a.status === b.status ? 0 : a.status === "Ongoing" ? -1 : 1
    );
    return sortedData;
  } else {
    console.error("Invalid data format:", data);
    return [];
  }
};

export const getPersonalTournamentAPI = async () => {
  const data = await fetchData(
    "https://664e992dfafad45dfae087c5.mockapi.io/Tournament?userId=1"
  );
  if (Array.isArray(data)) {
    const statusOrder = [
      "Ongoing",
      "Accepted",
      "Pending",
      "Completed",
      "Rejected",
    ];
    const sortedData = data.sort((a, b) => {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });
    return sortedData;
  } else {
    console.error("Invalid data format:", data);
    return [];
  }
};

export const getTournamentAPI = async (id) => {
  const data = await fetchData(
    `https://664e992dfafad45dfae087c5.mockapi.io/Tournament/${id}`
  );
  console.log("data", data);
  return data;
};

export const createTournamentAPI = async (tournament) => {
  // const data = await postData(
  //   "https://664e992dfafad45dfae087c5.mockapi.io/Tournament",
  //   tournament
  // );
  const data = tournament;
  return data;
};
