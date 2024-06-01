import React, { useEffect, useState } from "react";
import { Tag, Tooltip } from "antd";
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

const generateSlots = (center) => {
  const slotsArray = [{ dataIndex: "court" }];
  let currentTime = new Date(`1970-01-01T${center.openTime}:00`);
  const closeTime = new Date(`1970-01-01T${center.closeTime}:00`);

  while (currentTime < closeTime) {
    const nextTime = new Date(currentTime.getTime() + 30 * 60000);
    const slotString = nextTime.toTimeString().slice(0, 5);
    slotsArray.push({
      title: slotString,
      dataIndex: slotString,
      key: slotString,
    });
    currentTime = nextTime;
  }

  return slotsArray;
};

const transformData = (data, columns) => {
  return data.map((court) => {
    const courtRow = { key: court.courtid, court: `Sân ${court.courtnumber}` };
    const columnTracker = {};

    columns.forEach((col) => {
      if (col.dataIndex !== "court") columnTracker[col.dataIndex] = false;
    });

    court.bookings.forEach((booking) => {
      const start = new Date(`1970-01-01T${booking.startTime}:00`);
      const end = new Date(`1970-01-01T${booking.endTime}:00`);

      const columnsInRange = columns.filter(
        (col) =>
          new Date(`1970-01-01T${col.title}:00`) >= start &&
          new Date(`1970-01-01T${col.title}:00`) < end
      );

      if (columnsInRange.length > 0) {
        const startColumn = columnsInRange[0].dataIndex;
        courtRow[startColumn] = (
          <Tooltip title={`Xem chi tiết đặt sân`}>
            <td
              colSpan={columnsInRange.length}
              style={{
                paddingRight: "2px",
                paddingLeft: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Tag
                  style={{
                    width: "100%",
                    height: "6vh",
                    margin: "0",
                    textAlign: "center",
                  }}
                  color="cyan"
                >
                  {" "}
                  {booking.startTime} - {booking.endTime}
                </Tag>
              </div>
            </td>
          </Tooltip>
        );

        columnsInRange.forEach((col) => {
          columnTracker[col.dataIndex] = true;
        });
      }
    });

    columns.forEach((col) => {
      if (col.dataIndex !== "court" && !columnTracker[col.dataIndex]) {
        courtRow[col.dataIndex] = (
          <td
            key={col.key}
            style={{ paddingRight: "30px", paddingLeft: "30px" }}
            colSpan={1}
          ></td>
        );
      }
    });

    return courtRow;
  });
};

export default function CalendarSlot() {
  const { centerId } = useParams();
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const slots = generateSlots(center);
    setColumns(slots);
    setDataSource(transformData(courtSlotInDay, slots));
  }, []);
  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return (
    <>
      <style>
        {`
          td {
            border: 1px solid #ccc;
            text-align: center;
            vertical-align: middle;
          }
        `}
      </style>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((data) => (
              <tr key={data.key}>
                <td style={{ minWidth: "100px" }}>{data.court}</td>{" "}
                {columns.slice(1).map((col) => data[col.dataIndex])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
