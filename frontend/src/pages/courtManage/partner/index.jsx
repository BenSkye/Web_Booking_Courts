import React, { useState, useEffect } from "react";
import {
  Input,
  Upload,
  Button,
  Steps,
  message,
  Form,
  InputNumber,
  TimePicker,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import Cookies from "js-cookie";
import { submitForm } from "../../../services/partnerAPI";
import { useNavigate } from "react-router-dom";
import ServicesAndAmenities from "./components/ServicesAndAmenities";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../utils/firebase";
const { Step } = Steps;

const storage = getStorage(app);

const CenterForm = () => {
  // const [fileList, setFileList] = useState([]);
  const [fileListCourt, setFileListCourt] = useState([]);
  const [fileListLicense, setFileListLicense] = useState([]);
  const [showGoldenPrice, setShowGoldenPrice] = useState(false);
  const [showByMonthPrice, setShowByMonthPrice] = useState(false);
  const [showBuyPackage, setShowBuyPackage] = useState(false);

  const handleUploadCourt = async ({ file, onSuccess, onError }) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          onError(error);
          message.error("Upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            onSuccess(null, file);
            setFileListCourt((prevList) => [
              ...prevList,
              { ...file, url: downloadURL },
            ]);
            message.success("Upload successful");
          });
        }
      );
    } catch (error) {
      onError(error);
      message.error("Upload failed");
    }
  };
  const handleUploadLicense = async ({ file, onSuccess, onError }) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          onError(error);
          message.error("Upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            onSuccess(null, file);
            setFileListLicense((prevList) => [
              ...prevList,
              { ...file, url: downloadURL },
            ]);
            message.success("Upload successful");
          });
        }
      );
    } catch (error) {
      onError(error);
      message.error("Upload failed");
    }
  };

  const handleCheckboxChange = (e) => {
    setShowGoldenPrice(e.target.checked);
  };

  const handleByMonthPriceChange = (e) => {
    setShowByMonthPrice(e.target.checked);
  };

  const handleBuyPackageChange = (e) => {
    setShowBuyPackage(e.target.checked);
  };

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
      imagesLicense: [],
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
    ],
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      message.error("Token not found. Please log in.");
    }
  }, []);

  const steps = [
    {
      title: "Thông tin chi tiết của trung tâm",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên trung tâm"
            name="centerName"
            rules={[{ required: true, message: "Hãy nhập tên trung tâm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="location"
            rules={[{ required: true, message: "Hãy nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giờ mở cửa"
            name="openTime"
            rules={[{ required: true, message: "Hãy nhập giờ mở cửa" }]}
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
            label="Giờ đóng cửa"
            name="closeTime"
            rules={[{ required: true, message: "Hãy chọn giờ đóng cửa" }]}
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
            label="Số lượng sân của trung tâm"
            name="courtCount"
            rules={[{ required: true, message: "Hãy nhập số lượng sân" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Hình ảnh của sân"
            name="images"
            rules={[
              {
                required: true,
                message: "Bạn chưa đăng hình ảnh của sân( từ 3 ảnh trở lên)",
              },
            ]}
          >
            <Upload
              customRequest={handleUploadCourt}
              fileList={fileListCourt}
              onRemove={(file) => {
                setFileListCourt((prevList) =>
                  prevList.filter((item) => item.uid !== file.uid)
                );
              }}
              accept="image/*"
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Giấy phép kinh doanh hoặc giấy phép hoạt động"
            name="imagesLicense"
            rules={[
              {
                required: true,
                message:
                  "Bạn chưa đăng hình ảnh giấy phép kinh doanh hoặc giấy phép hoạt động",
              },
            ]}
          >
            <Upload
              customRequest={handleUploadLicense}
              fileList={fileListLicense}
              onRemove={(file) => {
                setFileListLicense((prevList) =>
                  prevList.filter((item) => item.uid !== file.uid)
                );
              }}
              accept="image/*"
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Dịch vụ và tiện ích"
            name="services"
            rules={[
              { required: true, message: "Hãy chọn các dịch vụ của bạn" },
            ]}
          >
            <ServicesAndAmenities />
          </Form.Item>
          <Form.Item
            label="Quy định sử dụng sân"
            name="rule"
            rules={[
              { required: true, message: "Hãy nhập quy định sử dụng sân" },
            ]}
          >
            <Input.TextArea placeholder="Ví dụ: Phải có giày thể thao thì mới được chơi" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Thông tin chi tiết về giá tiền và giờ chơi",
      content: (
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
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
                52, 53, 54, 55, 56, 57, 58, 59,
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
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
                52, 53, 54, 55, 56, 57, 58, 59,
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
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33,
                    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
                    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
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
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33,
                    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
                    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
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
      ),
    },
    {
      title: "Xem lại và xác nhận thông tin",
      content: (
        <div>
          <h3>Review your details</h3>
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
            images: fileListCourt.map((file) => file.url),
            imagesLicense: fileListLicense.map((file) => file.url),
            services: values.services,
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
          ];

          if (showGoldenPrice) {
            newFormValues.price.push({
              price: values.goldenPrice,
              startTime: values.startTimeGolden.format("HH:mm"),
              endTime: values.endTimeGolden.format("HH:mm"),
              cheduleType: "GoldenPrice",
            });
          }

          const openTime = newFormValues.center.openTime;
          const closeTime = newFormValues.center.closeTime;
          if (showByMonthPrice) {
            newFormValues.price.push({
              price: values.byMonthPrice,
              startTime: openTime,
              endTime: closeTime,
              cheduleType: "ByMonthPrice",
            });
          }

          if (showBuyPackage) {
            newFormValues.price.push({
              price: values.buyPackagePrice,
              startTime: openTime,
              endTime: closeTime,
              cheduleType: "BuyPackagePrice",
            });
          }
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
      navigate("/courtManage");
    } catch (error) {
      console.log(error);
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
