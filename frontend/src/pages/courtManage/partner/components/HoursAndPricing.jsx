import React, { useState } from "react";
import { Form, InputNumber, TimePicker, Checkbox } from "antd";
const { RangePicker } = TimePicker;

const HoursAndPricing = () => {
  const [isGoldenHourChecked, setIsGoldenHourChecked] = useState(false);
  const [isMonthPriceChecked, setIsMonthPriceChecked] = useState(false);
  const [isBuyHourChecked, setIsBuyHourChecked] = useState(false);

  const validateRange = (_, value) => {
    if (!value || value.length !== 2) {
      return Promise.reject(new Error("Giờ hoạt động là bắt buộc"));
    }
    const [start, end] = value;
    if (end.diff(start, "hours") < 8) {
      return Promise.reject(
        new Error("Giờ kết thúc phải cách giờ khởi đầu ít nhất 8 tiếng")
      );
    }
    return Promise.resolve();
  };

  return (
    <Form.Item label="5. Giờ hoạt động và giá tiền">
      <Form.Item>
        <h3>Giờ hoạt động</h3>
        <Form.Item
          name="nomalHours"
          label="Giờ hoạt động bình thường của sân (ít nhất phải 8 giờ)"
          rules={[{ validator: validateRange }]}
        >
          <RangePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="nomalPrice"
          label="Bảng giá thuê sân vào giờ bình thường (đồng/giờ)"
          rules={[
            { required: true, message: "Bảng giá thuê sân là bắt buộc" },
            { type: "number", min: 1, message: "Giá tiền phải lớn hơn 0" },
          ]}
        >
          <InputNumber placeholder="VD: 10000" />
        </Form.Item>
      </Form.Item>

      {/* Golden Hour */}
      <Form.Item>
        <h3>Khung giờ vàng</h3>
        <Form.Item name="isGoldenHours" valuePropName="checked">
          <Checkbox onChange={(e) => setIsGoldenHourChecked(e.target.checked)}>
            Đặt khung giờ vàng
          </Checkbox>
        </Form.Item>
        {isGoldenHourChecked && (
          <Form.Item>
            <Form.Item
              name="goldenHours"
              label="Khung giờ vàng của sân (phải nằm trong giờ hoạt động bình thường)"
              rules={[{ validator: validateRange }]}
            >
              <RangePicker format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="goldenPrice"
              label="Bảng giá thuê sân vào khung giờ vàng (đồng/giờ)"
              rules={[
                { required: true, message: "Bảng giá thuê sân là bắt buộc" },
                { type: "number", min: 1, message: "Giá tiền phải lớn hơn 0" },
              ]}
            >
              <InputNumber placeholder="VD: 10000" />
            </Form.Item>
          </Form.Item>
        )}
      </Form.Item>

      {/* Fixed Schedule */}
      <Form.Item>
        <h3>Đặt lịch cố định trong tháng</h3>
        <Form.Item name="isMonthPrice" valuePropName="checked">
          <Checkbox
            onChange={(e) => setIsMonthPriceChecked(e.target.checked)}
          >
            Đặt lịch cố định
          </Checkbox>
        </Form.Item>
        {isMonthPriceChecked && (
          <Form.Item
            name="monthPrice"
            label="Bảng giá đặt sân lịch cố định (đồng/giờ vd 80000/h), người chơi đặt lịch trong tháng cố định sẽ chỉ trả 60k dù có đánh giờ vàng hay giờ thường"
            rules={[
              { required: true, message: "Bảng giá thuê sân là bắt buộc" },
              { type: "number", min: 1, message: "Giá tiền phải lớn hơn 0" },
            ]}
          >
            <InputNumber placeholder="VD: 10000" />
          </Form.Item>
        )}
      </Form.Item>

      {/* Buy Hours */}
      <Form.Item>
        <h3>Mua giờ chơi</h3>
        <Form.Item name="isBuyHourPrice" valuePropName="checked">
          <Checkbox onChange={(e) => setIsBuyHourChecked(e.target.checked)}>
            Mua giờ chơi
          </Checkbox>
        </Form.Item>
        {isBuyHourChecked && (
          <Form.Item
            name="buyHourPrice"
            label="Bảng giá mua giờ chơi (đồng/giờ vd 80000/h), người chơi nếu mua giờ chơi sẽ có thể đặt bất kì giờ nào còn trống, nghĩa là nếu họ đặt trong giờ vàng thì họ sẽ chỉ mất số tiền của 1h chơi"
            rules={[
              { required: true, message: "Bảng giá thuê sân là bắt buộc" },
              { type: "number", min: 1, message: "Giá tiền phải lớn hơn 0 và phải là số" },
            ]}
          >
            <InputNumber placeholder="VD: 10000" />
          </Form.Item>
        )}
      </Form.Item>
    </Form.Item>
  );
};

export default HoursAndPricing;
