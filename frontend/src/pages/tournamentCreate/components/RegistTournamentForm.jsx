import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Skeleton,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTournamentAPI,
  getTournamentInCenterAPI,
} from "../../../services/tournamentAPI/tournamentAPI";
import AuthContext from "../../../services/authAPI/authProvideAPI";
import {
  checkUserHavePhone,
  updatePhone,
} from "../../../services/accountAPI/userAPi";

export default function RegistTournamentForm() {
  const centerId = useParams().centerID;
  const [listTournament, setListTournament] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disableDay, setDisableDay] = useState([]);

  const [newTournament, setNewTournament] = useState({});
  const onFinish = (values) => {
    values.startDate = dayjs(values.startDate).format("YYYY-MM-DD");
    values.endDate = dayjs(values.endDate).format("YYYY-MM-DD");
    values = { ...values, centerId: centerId };
    console.log("Received values from form: ", values);
    setNewTournament(values);
    showModal();
  };
  const [phoneExist, setPhoneExist] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const checkPhoneExist = async () => {
      const data = await checkUserHavePhone();
      console.log("Data:", data);
      setPhoneExist(data.result);
      if (!data.result) {
        setIsPhoneModalOpen(true);
      }
    };
    checkPhoneExist();
  }, []);
  useEffect(() => {
    const getListTournament = async () => {
      const data = await getTournamentInCenterAPI(centerId);
      setListTournament(data.tournaments);
      setLoading(false);
    };
    getListTournament();
  }, [centerId]);
  useEffect(() => {
    listTournament.forEach((tournament) => {
      if (tournament.status === "approved" || tournament.status === "confirm") {
        const startDate = dayjs(tournament.startDate);
        const endDate = dayjs(tournament.endDate);
        for (let i = startDate; i <= endDate; i = i.add(1, "day")) {
          setDisableDay((prev) => [...prev, i.format("YYYY-MM-DD")]);
        }
      }
    });
  }, [listTournament]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disableforend, setDisableforend] = useState(null);
  const [disableforstart, setDisableforStart] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setDisableforend(null);
    setDisableforStart(null);
    if (startDate) {
      console.log("startDate", startDate);
      const startDateformat = dayjs(startDate).format("YYYY-MM-DD");
      console.log("startDatformat", startDateformat);
      if (disableDay.length > 0) {
        const sortedDisableDay = [...disableDay].sort();
        for (const day of sortedDisableDay) {
          console.log("day", day);
          if (startDateformat < day) {
            console.log("daySelect", day);
            setDisableforend(day);
            break; // This will exit the loop when the condition is met
          }
        }
      }
    }
    if (endDate) {
      const endDateformat = dayjs(endDate).format("YYYY-MM-DD");
      console.log("startDatformat", endDateformat);
      if (disableDay.length > 0) {
        console.log("disableDay", disableDay);
        const sortedDisableDay = [...disableDay].sort((a, b) =>
          dayjs(b).isAfter(dayjs(a)) ? 1 : -1
        );
        console.log("sortedDisableDay", sortedDisableDay);
        for (const day of sortedDisableDay) {
          console.log("day", day);
          if (endDateformat > day) {
            console.log("daySelect", day);
            setDisableforStart(day);
            break; // This will exit the loop when the condition is met
          }
        }
      }
    }
  }, [startDate, endDate]);
  useEffect(() => {
    console.log("disableforstart", disableforstart);
  }, [disableforstart]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const handleOk = async () => {
    const data = await createTournamentAPI(newTournament);
    console.log("Received values from form: ", data);
    setIsModalOpen(false);
    navigate(`/tournament/detail/${data.data.tournament._id}`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePhoneModalOk = async () => {
    const data = await updatePhone(phone);
    console.log("Data:", data);
    if (data.status === "success") {
      message.success("Cập nhật số điện thoại thành công!");
      setIsPhoneModalOpen(false);
    } else {
      message.error("Cập nhật số điện thoại thất bại!");
    }
  };

  const handlePhoneModalCancel = () => {
    navigate(-1);
    setIsPhoneModalOpen(false);
  };
  if (loading) {
    return <Skeleton active />;
  }
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
          <InputNumber />
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
          <InputNumber />
        </Form.Item>

        <p>Cơ cấu giải thưởng</p>
        <Form.Item name="prizeStructure">
          <TextArea rows={5} />
        </Form.Item>
        <p>Đơn vị tài trợ</p>
        <Form.Item name="sponsor">
          <TextArea rows={5} />
        </Form.Item>

        <p>Ngày bắt đầu</p>
        <Form.Item
          name="startDate"
          rules={[{ required: true, message: "Chọn ngày bắt đầu!" }]}
        >
          <DatePicker
            defaultPickerValue={dayjs().add(7, "day")}
            disabledDate={(current) => {
              const currentDate = current.format("YYYY-MM-DD");
              const isBeforeAllowedDate =
                currentDate < dayjs().add(8, "day").format("YYYY-MM-DD") ||
                (endDate && current > dayjs(endDate).format("YYYY-MM-DD"));
              const isInDisabledDays = disableDay.includes(currentDate);
              const isAfterEndDate = endDate && current > dayjs(endDate);

              const isBeforeDisableStart =
                disableforstart &&
                currentDate < dayjs(disableforstart).format("YYYY-MM-DD");
              return (
                isBeforeAllowedDate ||
                isInDisabledDays ||
                isBeforeDisableStart ||
                isAfterEndDate
              );
            }}
            onChange={(date) => setStartDate(date)}
          />
        </Form.Item>

        <p>Ngày kết thúc</p>
        <Form.Item
          name="endDate"
          rules={[{ required: true, message: "Chọn ngày kết thúc!" }]}
        >
          <DatePicker
            defaultPickerValue={dayjs().add(7, "day")}
            disabledDate={(current) => {
              const currentDate = current.format("YYYY-MM-DD");
              const isBeforeAllowedDate =
                currentDate < dayjs().add(8, "day").format("YYYY-MM-DD") ||
                (startDate &&
                  currentDate < dayjs(startDate).format("YYYY-MM-DD"));
              const isInDisabledDays = disableDay.includes(currentDate);
              const isAfterDisableEnd =
                disableforend &&
                currentDate > dayjs(disableforend).format("YYYY-MM-DD");

              // Disable date if any condition is true
              return (
                isBeforeAllowedDate || isInDisabledDays || isAfterDisableEnd
              );
            }}
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
      <Modal
        title="Gửi yêu cầu đặt sân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Yêu cầu đặt sân sẽ được gửi đi và chờ chủ sân duyệt từ 1 tới 2 ngày
        </p>
      </Modal>
      <Modal
        title="Nhập số điện thoại để tiếp tục"
        open={isPhoneModalOpen}
        footer={
          <Button type="primary" onClick={handlePhoneModalCancel}>
            Quay lại
          </Button>
        }
      >
        <Form onFinish={handlePhoneModalOk}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
