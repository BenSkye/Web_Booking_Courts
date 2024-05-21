import React from "react";
import "./AboutUs.css";
// import aboutUs from '@assets/images/aboutUs.jpg';
export default function AboutUs() {
  return (
    <div>
      {/* about us */}
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-text-section">
            <h2>Racket Rise</h2>
            <h1>Về chúng tôi</h1>
            <p>
              Chào mừng bạn đến với Racket Rise, nền tảng đặt lịch sân cầu lông
              tiên tiến nhất hiện nay! Chúng tôi hiểu rằng niềm đam mê cầu lông
              của bạn không chỉ dừng lại ở những trận đấu gay cấn mà còn nằm ở
              sự tiện lợi trong việc tìm kiếm và đặt sân. Với Racket Rise, bạn
              có thể dễ dàng khám phá các sân cầu lông gần bạn, xem lịch trống
              và đặt sân chỉ trong vài bước đơn giản. Đội ngũ của chúng tôi cam
              kết mang đến cho bạn trải nghiệm đặt lịch nhanh chóng, thuận tiện
              và không bao giờ bỏ lỡ bất kỳ trận cầu nào. Hãy để chúng tôi đồng
              hành cùng bạn trên con đường chinh phục đỉnh cao cầu lông và thúc
              đẩy hệ sinh thái thể thao!
            </p>
          </div>
          <div className="about-us-image-section">
            <img src="src/assets/aboutUs.jpg" alt="Person playing badminton" />
          </div>
        </div>
      </div>
      {/* vision */}
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-image-section">
            <img
              src="src/assets/visionAboutUs.jpg"
              alt="Person playing badminton"
            />
          </div>
          <div className="about-us-text-section">
            <h1>Tầm nhìn</h1>
            <p>
              Racket Rise hướng tới trở thành nền tảng hàng đầu kết nối cộng
              đồng cầu lông toàn cầu, nâng cao trải nghiệm người chơi và thúc
              đẩy sự phát triển của thể thao. Chúng tôi cam kết mang lại sự tiện
              lợi tối đa trong việc tìm kiếm và đặt sân, đồng thời cung cấp các
              dịch vụ hỗ trợ toàn diện giúp người chơi nâng cao kỹ năng và kết
              nối với nhau. Bằng việc không ngừng cải tiến và mở rộng, chúng tôi
              mong muốn góp phần tạo nên một cộng đồng cầu lông năng động, đoàn
              kết và phát triển bền vững.
            </p>
          </div>
        </div>
      </div>
      {/* mission */}
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-text-section">
            <h2>Racket Rise</h2>
            <h1>Về chúng tôi</h1>
            <p>
              Chúng tôi mong muốn trở thành người ủng hộ thể thao lớn nhất! Với
              công nghệ thể thao của chúng tôi và tinh thần thể thao mạnh mẽ, có
              thể làm được, đây là ba điều mà chúng tôi hết lòng cam kết: Thu
              hút mọi người chơi thể thao nhiều hơn bằng cách Kết nối nhiều
              người chơi, doanh nghiệp và cộng đồng hơn với công nghệ của chúng
              tôi Vì sự phát triển của hệ sinh thái thể thao
            </p>
          </div>
          <div className="about-us-image-section">
            <img
              src="src/assets/missionAboutUs.jpg"
              alt="Person playing badminton"
            />
          </div>
        </div>
      </div>
      {/* value */}
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-image-section">
            <img
              src="src/assets/valueAboutUs.jpg"
              alt="Person playing badminton"
            />
          </div>
          <div className="about-us-text-section">
            <h1>Giá trị</h1>
            <p>
              Chúng tôi làm việc như một đội​ Cũng giống như trong thể thao,
              những cầu thủ xuất sắc trong đội sẽ củng cố đội của chúng ta.
              Chúng tôi tin vào công nghệ cho cộng đồng​ Chúng tôi tận tâm cung
              cấp các sản phẩm nổi bật vừa đơn giản vừa có mục đích, đảm bảo
              rằng thể thao vẫn thú vị mà không gây đau đầu cho người chơi và
              doanh nghiệp.​ Chúng tôi theo đuổi sự xuất sắc Cách tiếp cận lấy
              khách hàng làm trung tâm giúp chúng tôi liên tục đổi mới, học hỏi
              và nâng cao dịch vụ của mình để phục vụ tốt hơn cho ngành thể
              thao. Thông qua công nghệ thể thao và cách tiếp cận đổi mới, chúng
              tôi đã phá vỡ các ranh giới truyền thống và sẽ tiếp tục làm như
              vậy để nâng tầm ngành thể thao.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
