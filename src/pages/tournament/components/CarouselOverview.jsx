import { Carousel } from "antd";
const contentStyle = {
  margin: 0,
  height: "250px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function CarouselOverview() {
  return (
    <div>
      <Carousel arrows infinite={false}>
        <div>
          <h1 style={contentStyle}>Đăng ký thuê sân để tổ chức giải đấu.</h1>
        </div>
        <div>
          <h1 style={contentStyle}>
            Dành cho mọi giải đấu từ phong trào đến chuyên nghiệp
          </h1>
        </div>
        <div>
          <h1 style={contentStyle}>Đăng ký minh bạch rõ ràng</h1>
        </div>
        <div>
          <h1 style={contentStyle}>Thanh toán nhanh</h1>
        </div>
      </Carousel>
    </div>
  );
}
