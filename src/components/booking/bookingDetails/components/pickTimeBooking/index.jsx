import { Button } from 'antd';

export default function PickTimeBooking({ checkOut }) {
  return (
    <div>
      <h1>Chọn thời gian đặt sân</h1>
      <Button type='primary' onClick={checkOut}>
        Check out
      </Button>
    </div>
  );
}
