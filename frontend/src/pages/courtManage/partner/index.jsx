import React, { useState } from "react";
import { Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { submitForm } from "../../../services/partnerAPI/index.js";
import PersonalInfo from "./components/PersonalInfo.jsx";
import CourtInfo from "./components/CourtInfo.jsx";
import CourtImages from "./components/CourtImages.jsx";
import ServicesAndAmenities from "./components/ServicesAndAmenities.jsx";
import HoursAndPricing from "./components/HoursAndPricing.jsx";
import AdditionalInfo from "./components/AdditionalInfo.jsx";
import { getBase64 } from "./components/fileUtils.jsx";
import Cookies from 'js-cookie';

function Partner() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});

  const onFinish = async () => {
    setSubmitting(true);
    const images = await Promise.all(
      fileList.map((file) => getBase64(file.originFileObj))
    );
    const currentFormValues = form.getFieldsValue();
    const updatedValues = {
      ...formValues,
      ...currentFormValues,
    };

    const token = Cookies.get('jwtToken'); // Get the token from localStorage

    submitForm(updatedValues, token) // Pass the token here
    .then(() => {
      message.success("Form submitted successfully!");
      navigate("/courtManage");
    })
    .catch((error) => {
      message.error("There was an error submitting the form");
      console.error(error);
    })
    .finally(() => {
      setSubmitting(false);
    });
  };

  const handleUploadChange = ({ fileList }) => {
    const filteredFileList = fileList.filter(file => file.type.startsWith("image/"));
    setFileList(filteredFileList);
    form.setFieldsValue({ images: filteredFileList });
  };

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage ? true : Upload.LIST_IGNORE;
  };

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    // <PersonalInfo />,
    <CourtInfo />,
    <CourtImages
      handleUploadChange={handleUploadChange}
      handleBeforeUpload={handleBeforeUpload}
    />,
    <ServicesAndAmenities />,
    <HoursAndPricing />,
    <AdditionalInfo />,
  ];

  return (
    <div className="App">
      <h1>Đăng ký trở thành cộng tác viên</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ services: [], courtType: [], paymentMethods: [] }}
      >
        {steps[currentStep]}
        <Form.Item>
          {currentStep > 0 && (
            <Button
              type="default"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Quay lại
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    setFormValues({ ...formValues, ...values });
                    setCurrentStep(currentStep + 1);
                  })
                  .catch((errorInfo) => {
                    console.log("Failed:", errorInfo);
                  });
              }}
            >
              Tiếp theo
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="submit-btn"
              disabled={submitting}
            >
              Hoàn thành (tạo sân cầu lông đầu tiên của bạn)
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default Partner;