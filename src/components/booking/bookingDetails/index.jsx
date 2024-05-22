import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Steps } from 'antd';
import { MdPayment } from 'react-icons/md';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { CiBoxList } from 'react-icons/ci';
import PickTimeBooking from './components/pickTimeBooking';
import PaymentBooking from './components/paymentBooking';
import ViewBooking from './components/viewBooking';

const { Step } = Steps;

export default function BookingDetail() {
  const { id } = useParams(); // Lấy id từ URL

  // State để lưu trạng thái của bước hiện tại
  const [currentStep, setCurrentStep] = useState(0);

  // Mảng chứa các bước
  const steps = [
    {
      title: 'Booking Details',
      icon: <CiBoxList />,
      content: <PickTimeBooking checkOut={() => setCurrentStep(1)} />,
    },
    {
      title: 'Payment',
      icon: <MdPayment />,
      content: <PaymentBooking setCurrentStep={setCurrentStep} />,
    },
    {
      title: 'Done',
      icon: <IoCheckmarkDoneCircleOutline />,
      content: <ViewBooking setCurrentStep={setCurrentStep} />,
    },
  ];

  return (
    <div>
      <p>ID sân: {id}</p>
      <>
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>
        {/* Hiển thị nội dung của bước hiện tại */}
        {steps[currentStep].content}
      </>
    </div>
  );
}
