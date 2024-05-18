import { Col, Row } from 'antd';

const footerStyle = { color: 'white', padding: '20px' };
const columnStyle = { padding: '8px 0', color: 'white' };

export default function FooterLayout() {
  return (
    <div style={footerStyle}>
      <Row
        gutter={16}
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <Col className='gutter-row' span={7}>
          <div style={columnStyle}>
            <h3>GIỚI THIỆU</h3>
            <p>
              Đặt sân 247 cung cấp các tiện ích thông minh giúp cho bạn tìm sân
              cầu lông một cách hiệu quả nhất.
            </p>
          </div>
        </Col>
        <Col className='gutter-row' span={4}>
          <div style={columnStyle}>
            <h3>CHÍNH SÁCH</h3>
            <p>Chính sách bảo mật</p>
            <p>Chính sách huỷ (đổi trả)</p>
            <p>Chính sách kiểm hàng</p>
            <p>Chính sách thanh toán</p>
          </div>
        </Col>
        <Col className='gutter-row' span={7}>
          <div style={columnStyle}>
            <h3>THÔNG TIN</h3>
            <p>Công ty Cổ phần Booking 247 MST 0110175404</p>
            <p>Email: contact@datsan247.com</p>
            <p>
              Địa chỉ: Số 3 ngõ 612/34/15 Đường La Thành, Phường Giảng Võ, Quận
              Ba Đình, Thành phố Hà Nội, Việt Nam
            </p>
            <p>Điện thoại: 0247.303.0247</p>
            <p>
              Giấy phép ĐKKD số 0110175404 do Sở Kế hoạch và Đầu tư thành phố Hà
              Nội cấp ngày 08/11/2022
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
