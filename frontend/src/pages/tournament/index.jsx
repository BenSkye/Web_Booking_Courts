import { Col, Row } from "antd";
import CarouselOverview from "./components/CarouselOverview";
import HistoryTournament from "./components/HistoryTournament";
import ButtonRouter from "./components/ButtonRouter";
import TopCenter from "./components/TopCenter";

export default function Tournament() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <CarouselOverview />
      <Row gutter={16} justify="center">
        <Col span={12}>
          <h2>Các giải đấu đã được tổ chức</h2>
          <HistoryTournament />
        </Col>
        <Col
          span={12}
          style={{
            marginTop: 20,
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <ButtonRouter />
        </Col>
      </Row>
      {/* <Row style={{ marginTop: "30px" }}>
        <TopCenter />
      </Row> */}
    </div>
  );
}
