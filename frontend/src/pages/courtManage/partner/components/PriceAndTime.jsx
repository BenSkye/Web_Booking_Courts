import React from "react";
import { Form, InputNumber, TimePicker, Checkbox } from "antd";

const CustomForm = ({
  form,
  handleCheckboxChange,
  showGoldenPrice,
  handleByMonthPriceChange,
  showByMonthPrice,
  handleBuyPackageChange,
  showBuyPackage,
}) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Giá tiền giờ chơi bình thường"
        name="normalPrice"
        rules={[
          {
            required: true,
            message: "Hãy nhập giá tiền giờ chơi bình thường !",
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Giờ bắt đầu (giờ chơi bình thường)"
        name="startTimeNormal"
        rules={[{ required: true, message: "Hãy chọn giờ bắt đầu!" }]}
      >
        <TimePicker
          format={"HH:mm"}
          disabledMinutes={() => [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37,
            38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
            55, 56, 57, 58, 59,
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Giờ mở của (giờ chơi bình thường)"
        name="endTimeNormal"
        rules={[{ required: true, message: "Hãy chọn giờ kết thúc!" }]}
      >
        <TimePicker
          format={"HH:mm"}
          disabledMinutes={() => [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37,
            38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
            55, 56, 57, 58, 59,
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Checkbox onChange={handleCheckboxChange}>
          Include Golden Price
        </Checkbox>
      </Form.Item>
      {showGoldenPrice && (
        <Form.Item className="time_and_price">
          <Form.Item
            label="Khung giờ vàng (giờ vàng có giá tiền khác biệt so với giờ chơi bình thường)"
            name="goldenPrice"
            rules={[
              {
                required: showGoldenPrice,
                message: "Hạy nhập giá tiền giờ chơi khung giờ vàng!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Giờ bắt đầu (giờ vàng)"
            name="startTimeGolden"
            rules={[
              {
                required: showGoldenPrice,
                message: "Hãy chọn giờ bắt đầu",
              },
            ]}
          >
            <TimePicker
              format={"HH:mm"}
              disabledMinutes={() => [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
                52, 53, 54, 55, 56, 57, 58, 59,
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Giờ kết thúc (giờ vàng)"
            name="endTimeGolden"
            rules={[
              {
                required: showGoldenPrice,
                message: "Hãy chọn giờ kết thúc!",
              },
            ]}
          >
            <TimePicker
              format={"HH:mm"}
              disabledMinutes={() => [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
                52, 53, 54, 55, 56, 57, 58, 59,
              ]}
            />
          </Form.Item>
        </Form.Item>
      )}

      <Form.Item>
        <Checkbox onChange={handleByMonthPriceChange}>
          Include By Month Price
        </Checkbox>
      </Form.Item>
      {showByMonthPrice && (
        <Form.Item className="time_and_price">
          <Form.Item
            label="Đặt lịch cố định trong tháng (giá tiền cố định trong tháng, không quan trọng giờ)"
            name="byMonthPrice"
            rules={[
              {
                required: showByMonthPrice,
                message: "Hãy nhập giá tiền cố định trong tháng!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form.Item>
      )}

      <Form.Item>
        <Checkbox onChange={handleBuyPackageChange}>
          Include Buy Package
        </Checkbox>
      </Form.Item>
      {showBuyPackage && (
        <Form.Item className="time_and_price">
          <Form.Item
            label="Mua giờ chơi (giá tiền mua giờ chơi, không quan trọng giờ)"
            name="buyPackagePrice"
            rules={[
              {
                required: showBuyPackage,
                message: "Hãy nhập giá tiền mua giờ chơi!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form.Item>
      )}
    </Form>
  );
};

export default CustomForm;
