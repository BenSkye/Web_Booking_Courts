import { useEffect, useState } from 'react';
import { getListCourtsByCenterId_API } from '@/services/courtAPI/getCourtsAPI';
import ListCenter from '../../tournamentCreate/components/ListCenter';
import { Col, Row } from 'antd';
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
      const data = await getListCourtsByCenterId_API();
      console.log('top 4', data);
      setCourts(data);
      setLoading(false);
    };
    getCourts();
  }, []);
  return (
    <Row>
      <Col>
        <h1>Các trung tâm thường tổ chức giải</h1>
      </Col>
      <Col>
        <ListCenter listCenter={courts} loading={loading} />
      </Col>
    </Row>
  );
}
