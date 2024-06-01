import { Col, Row } from "antd";

import CenterCard from "./CenterCard";
import CardLoader from "./../../../utils/loader/skeletonLoader/loaderCard";
export default function ListCenter({ listCenter, loading }) {
  console.log("listCenter", listCenter);
  return (
    <Row
      gutter={[16, 16]}
      style={{
        width: "100%",
        margin: "0 auto",
      }}
    >
      {" "}
      {loading
        ? [1, 2, 3, 4, 5, 6].map((key) => (
            <Col key={key} xs={24} sm={12} lg={8}>
              <CardLoader />
            </Col>
          ))
        : listCenter.map((center) => (
            <Col key={center.id} xs={24} sm={12} lg={8}>
              <CenterCard center={center} key={center.id} />
            </Col>
          ))}
    </Row>
  );
}
