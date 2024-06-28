import React from "react";
import { Card, Col, Row, Typography, Image } from "antd";
import "./AboutUs.css";

const { Title, Paragraph } = Typography;

export default function AboutUs() {
  return (
    <div>
      {/* about us */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={2}><strong>Racket Rise</strong></Title>
              <Title level={1}>Về chúng tôi</Title>
              <Paragraph>
                Chào mừng bạn đến với <strong>Racket Rise</strong>, nền tảng đặt lịch sân cầu lông
                tiên tiến nhất hiện nay! Chúng tôi hiểu rằng niềm đam mê cầu lông
                của bạn không chỉ dừng lại ở những trận đấu gay cấn mà còn nằm ở
                sự tiện lợi trong việc tìm kiếm và đặt sân. Với <strong>Racket Rise</strong>, bạn
                có thể dễ dàng khám phá các sân cầu lông gần bạn, xem lịch trống
                và đặt sân chỉ trong vài bước đơn giản. Đội ngũ của chúng tôi cam
                kết mang đến cho bạn trải nghiệm đặt lịch nhanh chóng, thuận tiện
                và không bao giờ bỏ lỡ bất kỳ trận cầu nào. Hãy để chúng tôi đồng
                hành cùng bạn trên con đường chinh phục đỉnh cao cầu lông và thúc
                đẩy hệ sinh thái thể thao!
              </Paragraph>
            </Col>
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/aboutUs.jpg"
                alt="Person playing badminton"
                width="100%"
                height="auto"
                style={{ objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Card>
      </div>
      {/* vision */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/visionAboutUs.jpg"
                alt="Person playing badminton"
                width="100%"
                height="auto"
                style={{ objectFit: "cover" }}
              />
            </Col>
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={1}>Tầm nhìn</Title>
              <Paragraph>
                <strong>Racket Rise</strong> hướng tới trở thành nền tảng hàng đầu kết nối cộng
                đồng cầu lông toàn cầu, nâng cao trải nghiệm người chơi và thúc
                đẩy sự phát triển của thể thao. Chúng tôi cam kết mang lại sự tiện
                lợi tối đa trong việc tìm kiếm và đặt sân, đồng thời cung cấp các
                dịch vụ hỗ trợ toàn diện giúp người chơi nâng cao kỹ năng và kết
                nối với nhau. Bằng việc không ngừng cải tiến và mở rộng, chúng tôi
                mong muốn góp phần tạo nên một cộng đồng cầu lông năng động, đoàn
                kết và phát triển bền vững.
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </div>
      {/* mission */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={1}>Sứ mệnh</Title>
              <Paragraph>
                Chúng tôi mong muốn trở thành người ủng hộ thể thao lớn nhất! Với
                công nghệ thể thao của chúng tôi và tinh thần thể thao mạnh mẽ, có
                thể làm được, đây là ba điều mà chúng tôi hết lòng cam kết: Thu
                hút mọi người chơi thể thao nhiều hơn bằng cách Kết nối nhiều
                người chơi, doanh nghiệp và cộng đồng hơn với công nghệ của chúng
                tôi Vì sự phát triển của hệ sinh thái thể thao.
              </Paragraph>
            </Col>
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/missionAboutUs.jpg"
                alt="Person playing badminton"
                width="100%"
                height="auto"
                style={{ objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Card>
      </div>
      {/* value */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/valueAboutUs.jpg"
                alt="Person playing badminton"
                width="100%"
                height="auto"
                style={{ objectFit: "cover" }}
              />
            </Col>
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={1}>Giá trị</Title>
              <Paragraph>
                Chúng tôi làm việc như một đội. Cũng giống như trong thể thao,
                những cầu thủ xuất sắc trong đội sẽ củng cố đội của chúng ta.
                Chúng tôi tin vào công nghệ cho cộng đồng. Chúng tôi tận tâm cung
                cấp các sản phẩm nổi bật vừa đơn giản vừa có mục đích, đảm bảo
                rằng thể thao vẫn thú vị mà không gây đau đầu cho người chơi và
                doanh nghiệp. Chúng tôi theo đuổi sự xuất sắc. Cách tiếp cận lấy
                khách hàng làm trung tâm giúp chúng tôi liên tục đổi mới, học hỏi
                và nâng cao dịch vụ của mình để phục vụ tốt hơn cho ngành thể
                thao. Thông qua công nghệ thể thao và cách tiếp cận đổi mới, chúng
                tôi đã phá vỡ các ranh giới truyền thống và sẽ tiếp tục làm như
                vậy để nâng tầm ngành thể thao.
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}
