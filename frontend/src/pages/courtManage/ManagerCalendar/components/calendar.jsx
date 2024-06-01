import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const center = {
  _id: { $oid: "6659c9640c9744e84bee0fe7" },
  name: "Test Center123",
  location: "123 Test Street, Test City, Test Country",
  openTime: "08:30",
  closeTime: "20:00",
  courtNumber: 5,
  expiryDate: { $date: "2024-12-31T00:00:00.000Z" },
  status: "pending",
  __v: 0,
};

const courtSlotInDay = [
  {
    courtid: "02383",
    courtnumber: "01",
    bookings: [
      {
        bookingId: "3132",
        date: "2024-06-01T12:58:12.813+00:00",
        startTime: "09:30",
        endTime: "11:00",
      },
      {
        bookingId: "3462",
        date: "2024-06-01T12:58:12.813+00:00",
        startTime: "11:00",
        endTime: "12:00",
      },
      {
        bookingId: "456",
        date: "2024-06-01T12:58:12.813+00:00",
        startTime: "15:00",
        endTime: "17:00",
      },
    ],
  },
  {
    courtid: "23131",
    courtnumber: "02",
    bookings: [
      {
        bookingId: "321",
        date: "2024-06-01T12:58:12.813+00:00",
        startTime: "10:30",
        endTime: "13:00",
      },
      {
        bookingId: "789",
        date: "2024-06-01T12:58:12.813+00:00",
        startTime: "17:30",
        endTime: "19:00",
      },
    ],
  },
  { courtid: "4324", courtnumber: "03", bookings: [] },
];

const transformData = (data, columns) => {
  return data.map((court) => {
    const courtRow = { key: court.courtid, court: `Sân ${court.courtnumber}` };
    court.bookings.forEach((booking) => {
      const columnsInRange = columns.filter(
        (col) =>
          new Date(`1970-01-01T${booking.startTime}:00`) <=
            new Date(`1970-01-01T${col.title}:00`) &&
          new Date(`1970-01-01T${booking.endTime}:00`) >
            new Date(`1970-01-01T${col.title}:00`)
      );

      columnsInRange.forEach((column, index) => {
        courtRow[column.dataIndex] = (
          <Tooltip title={`Sân đã đặt ${booking.bookingId}`}>
            <div
              className={
                index === 0
                  ? "booking-start"
                  : index === columnsInRange.length - 1
                  ? "booking-end"
                  : "booking-ontime"
              }
              style={{
                backgroundColor: "#44E3CF",
                height: "6vh",
                borderTopLeftRadius: index === 0 ? "10px" : "0",
                borderBottomLeftRadius: index === 0 ? "10px" : "0",
                borderTopRightRadius:
                  index === columnsInRange.length - 1 ? "10px" : "0",
                borderBottomRightRadius:
                  index === columnsInRange.length - 1 ? "10px" : "0",
              }}
            ></div>
          </Tooltip>
        );
      });
    });
    return courtRow;
  });
};

const generateSlots = (center) => {
  const slotsArray = [
    { title: "", dataIndex: "court", fixed: "left", width: 80 },
  ];
  let currentTime = new Date(`1970-01-01T${center.openTime}:00`);
  const closeTime = new Date(`1970-01-01T${center.closeTime}:00`);

  while (currentTime < closeTime) {
    const nextTime = new Date(currentTime.getTime() + 30 * 60000);
    const slotString = nextTime.toTimeString().slice(0, 5);
    slotsArray.push({
      title: slotString,
      dataIndex: slotString,
      key: slotString,
      width: 80,
    });
    currentTime = nextTime;
  }

  return slotsArray;
};

export default function CalendarSlot() {
  const { centerId } = useParams(); // Lấy id từ URL
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const slots = generateSlots(center);
    setColumns(slots);
    setDataSource(transformData(courtSlotInDay, slots));
  }, []);

  return (
    <>
      <style>
        {`
          td:has(.booking-start) { padding-right: 0 !important; }
          td:has(.booking-end) { padding-left: 0 !important; }
          td:has(.booking-ontime) { padding-right: 0 !important; padding-left: 0 !important; }
        `}
      </style>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          tableLayout="fixed"
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
}
