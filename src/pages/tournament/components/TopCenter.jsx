import { useEffect, useState } from "react";
import { getAllCenterAPI } from "@/services/courtAPI/getCourtsAPI";
import ListCenter from "../../tournamentCreate/components/ListCenter";
import CenterContext from "../../tournamentCreate/components/CenterContex";
export default function TopCenter() {
  const [centerID, setCenterID] = useState(null);
  useState(() => {
    console.log(centerID);
  }, [centerID]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourts = async () => {
      setLoading(true);
      const data = await getAllCenterAPI();
      console.log("top 4", data);
      setCourts(data);
      setLoading(false);
    };
    getCourts();
  }, []);
  return (
    <CenterContext.Provider value={{ setCenterID }}>
      <div>
        <h1>Các trung tâm thường tổ chức giải</h1>
        <ListCenter listCenter={courts} loading={loading} />
      </div>
    </CenterContext.Provider>
  );
}
