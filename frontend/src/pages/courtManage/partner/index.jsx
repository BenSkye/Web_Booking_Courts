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
import Cookies from "js-cookie";
import { submitForm } from "../../../services/partnerAPI";
import { useNavigate } from "react-router-dom";
import ServicesAndAmenities from "./components/ServicesAndAmenities";
import CenterDetailsForm from "./components/CenterDetailsForm";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../utils/firebase";
import ReviewStep from "./components/ReviewStep";
import PriceAndTime from "./components/PriceAndTime";
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
        <CenterDetailsForm
          form={form}
          handleUploadCourt={handleUploadCourt}
          handleUploadLicense={handleUploadLicense}
          fileListCourt={fileListCourt}
          fileListLicense={fileListLicense}
          setFileListCourt={setFileListCourt}
          setFileListLicense={setFileListLicense}
        />
      ),
    },
    {
      title: "Thông tin chi tiết về giá tiền và giờ chơi",
      content: (
        <PriceAndTime
          form={form}
          handleCheckboxChange={handleCheckboxChange}
          showGoldenPrice={showGoldenPrice}
          handleByMonthPriceChange={handleByMonthPriceChange}
          showByMonthPrice={showByMonthPrice}
          handleBuyPackageChange={handleBuyPackageChange}
          showBuyPackage={showBuyPackage}
        />
      ),
    },
    {
      title: "Xem lại và xác nhận thông tin",
      content: <ReviewStep formValues={formValues} />,
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
