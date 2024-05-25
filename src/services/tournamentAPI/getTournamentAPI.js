import { fetchDataMockAPI } from "@/services/fetchAPI";

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
