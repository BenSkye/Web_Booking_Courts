import { useEffect, useState } from 'react';
import { getListCourtsByCenterId_API } from '@/services/courtAPI/getCourtsAPI';
import ListCenter from './ListCenter';
export default function ChooseCenter() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourts = async () => {
      setLoading(true);
      const data = await getListCourtsByCenterId_API();
      setCourts(data);
      setLoading(false);
    };
    getCourts();
  }, []);
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>
        Danh sách trung tâm cầu lông hỗ trợ tổ chức giải
      </h1>
      <ListCenter listCenter={courts} loading={loading} />
    </div>
  );
}
