import React from 'react';
import './AboutUs.css';
// import aboutUs from '@assets/images/aboutUs.jpg';
export default function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-text-section">
          <h2>Racket Rise</h2>
          <h1>Về chúng tôi</h1>
          <p>
            Chào mừng bạn đến với Racket Rise, nền tảng đặt lịch sân cầu lông tiên tiến nhất hiện nay! Chúng tôi hiểu rằng niềm đam mê cầu lông của bạn không chỉ dừng lại ở những trận đấu gay cấn mà còn nằm ở sự tiện lợi trong việc tìm kiếm và đặt sân. Với Racket Rise, bạn có thể dễ dàng khám phá các sân cầu lông gần bạn, xem lịch trống và đặt sân chỉ trong vài bước đơn giản. Đội ngũ của chúng tôi cam kết mang đến cho bạn trải nghiệm đặt lịch nhanh chóng, thuận tiện và không bao giờ bỏ lỡ bất kỳ trận cầu nào. Hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục đỉnh cao cầu lông!
          </p>
        </div>
        <div className="about-us-image-section">
          <img src="src/assets/aboutUs.jpg" alt="Person playing badminton" />
        </div>
      </div>
    </div>
  );
}
