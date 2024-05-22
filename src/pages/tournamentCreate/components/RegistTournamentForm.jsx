import { Button, DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function RegistTournamentForm() {
  const centerID = useParams().centerID;
  const onFinish = (values) => {
    console.log("Received values from form: ", {
      centerID: centerID,
      ...values,
    });
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <>
      <h1>Điền thông tin về giải đấu</h1>
      <Form name="register" onFinish={onFinish} scrollToFirstError>
        <p>Tên tổ chức hoặc cá nhân tổ chức giải đấu</p>
        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <p>Số điện thoại</p>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <p>Địa chỉ email</p>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
            {
              required: true,
              message: "Vui lòng nhập Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <p>Tên giải đấu</p>
        <Form.Item
          name="tournamentName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên giải đấu!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <p>Mô tả ngắn gọn về giải đấu</p>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message:
                "Cung cấp mô tả để quản lý sân hiểu thêm về giải đấu cảu bạn!",
              whitespace: true,
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>

        <p>Số lượng vận động viên dự kiến</p>
        <Form.Item
          name="numberOfAthletes"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng vận động viên dự kiến!",
            },
            {
              pattern: /^\d+$/,
              message: "Nhập số bạn nhé!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <p>Số lượng trận đấu dự kiến</p>
        <Form.Item
          name="numberOfMatches"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số trận đấu dự kiến!",
            },
            {
              pattern: /^\d+$/,
              message: "Nhập số bạn nhé!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <p>Ngày bắt đầu</p>
        <Form.Item
          name="startDate"
          rules={[{ required: true, message: "Chọn ngày bắt đầu!" }]}
        >
          <DatePicker
            disabledDate={(current) =>
              current &&
              (current < dayjs().endOf("day") || (endDate && current > endDate))
            }
            onChange={(date) => setStartDate(date)}
          />
        </Form.Item>

        <p>Ngày kết thúc</p>
        <Form.Item
          name="endDate"
          rules={[{ required: true, message: "Chọn ngày kết thúc!" }]}
        >
          <DatePicker
            disabledDate={(current) =>
              current &&
              (current < dayjs().endOf("day") ||
                (startDate && current < startDate))
            }
            onChange={(date) => setEndDate(date)}
          />
        </Form.Item>

        <p>Yêu cầu đặc biệt</p>
        <Form.Item name="specialRequests">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
