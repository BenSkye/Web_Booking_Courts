import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  TimePicker,
  InputNumber,
  Upload,
  Button,
  Steps,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import Cookies from "js-cookie";
import { submitForm } from "../../../services/partnerAPI"; // Đảm bảo đường dẫn đúng
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const CenterForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({
    center: {
      centerName: "",
      location: "",
      openTime: "",
      closeTime: "",
      courtCount: 0,
      images: [],
      services: [],
      rule: "",
    },
    price: [
      {
        price: 0,
        startTime: "",
        endTime: "",
        cheduleType: "",
      },
      {
        price: 0,
        startTime: "",
        endTime: "",
        cheduleType: "",
      },
    ],
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Lấy token từ cookie
    const token = Cookies.get("jwtToken");
    if (!token) {
      message.error("Token not found. Please log in.");
    }
  }, []);

  const steps = [
    {
      title: "Center Details",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            label="Center Name"
            name="centerName"
            rules={[{ required: true, message: "Please input center name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input location!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Open Time"
            name="openTime"
            rules={[{ required: true, message: "Please select open time!" }]}
          >
            <TimePicker format={"HH:mm"} />
          </Form.Item>
          <Form.Item
            label="Close Time"
            name="closeTime"
            rules={[{ required: true, message: "Please select close time!" }]}
          >
            <TimePicker format={"HH:mm"} />
          </Form.Item>
          <Form.Item
            label="Court Count"
            name="courtCount"
            rules={[{ required: true, message: "Please input court count!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Images"
            name="images"
            rules={[{ required: true, message: "Please upload images!" }]}
          >
            <Upload multiple>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Services"
            name="services"
            rules={[{ required: true, message: "Please input services!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Rule"
            name="rule"
            rules={[{ required: true, message: "Please input rule!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Price Details",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            label="Normal Price"
            name="normalPrice"
            rules={[{ required: true, message: "Please input normal price!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Start Time (Normal)"
            name="startTimeNormal"
            rules={[{ required: true, message: "Please select start time!" }]}
          >
            <TimePicker format={"HH:mm"} />
          </Form.Item>
          <Form.Item
            label="End Time (Normal)"
            name="endTimeNormal"
            rules={[{ required: true, message: "Please select end time!" }]}
          >
            <TimePicker format={"HH:mm"} />
          </Form.Item>
          <Form.Item
            label="Golden Price"
            name="goldenPrice"
            rules={[{ required: true, message: "Please input golden price!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Start Time (Golden)"
            name="startTimeGolden"
            rules={[{ required: true, message: "Please select start time!" }]}
          >
            <TimePicker format={"HH:mm"} />
          </Form.Item>
          <Form.Item
            label="End Time (Golden)"
            name="endTimeGolden"
            rules={[{ required: true, message: "Please select end time!" }]}
          >
            <TimePicker format={"HH:mm"} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <div>
          <h3>Review your details</h3>
          {/* Hiển thị các giá trị đã nhập */}
          {/* Bạn có thể tùy chỉnh phần này để hiển thị dữ liệu chi tiết hơn */}
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </div>
      ),
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        const newFormValues = { ...formValues };
        if (current === 0) {
          newFormValues.center = {
            centerName: values.centerName,
            location: values.location,
            openTime: values.openTime.format("HH:mm"),
            closeTime: values.closeTime.format("HH:mm"),
            courtCount: values.courtCount,
            images: values.images.fileList.map((file) => file.name),
            services: values.services.split(","),
            rule: values.rule,
          };
        } else if (current === 1) {
          newFormValues.price = [
            {
              price: values.normalPrice,
              startTime: values.startTimeNormal.format("HH:mm"),
              endTime: values.endTimeNormal.format("HH:mm"),
              cheduleType: "normalPrice",
            },
            {
              price: values.goldenPrice,
              startTime: values.startTimeGolden.format("HH:mm"),
              endTime: values.endTimeGolden.format("HH:mm"),
              cheduleType: "GoldenPrice",
            },
          ];
        }
        setFormValues(newFormValues);
        setCurrent(current + 1);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("jwtToken");
      await submitForm(formValues, token);
      message.success("Form submitted successfully!");
      navigate("/courtManage")
    } catch (error) {
      message.error("Failed to submit form!");
    }
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default CenterForm;
