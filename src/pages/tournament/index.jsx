import { Col, Row } from "antd";
import CarouselOverview from "./components/CarouselOverview";
import HistoryTournament from "./components/HistoryTournament";
import ButtonRouter from "./components/ButtonRouter";
export default function tournament() {
  return (
    <div>
      <CarouselOverview />
      <Row>
        <Col span={12}>
          <HistoryTournament />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonRouter />
        </Col>
      </Row>
    </div>
  );
}
