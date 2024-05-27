import { fetchDataMockAPI } from "@/services/fetchAPI";
import { postData } from "../fetchAPI";

export const getAllTournamentAPI = async () => {
  const data = await fetchDataMockAPI(
    "https://664e992dfafad45dfae087c5.mockapi.io/Tournament"
  );
  if (Array.isArray(data)) {
    return data; // Đảm bảo trả về mảng
  } else {
    console.error("Invalid data format:", data);
    return [];
  }
};

export const getTournamentAPI = async (id) => {
  const data = await fetchDataMockAPI(
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
