import { Button, Card, Col, DatePicker, List, Row, Select, Steps } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { formatPrice } from "../../../../utils/priceFormatter";
import {
  getAvailableCourtAPI,
  getAvailableDurationAPI,
  getFreeTimeByDateAPI,
} from "../../../../services/slotBookingAPI";
const { Step } = Steps;
const { Option } = Select;

export default function UpdateBooking({ oldBooking }) {
  const [selectedDate, setSelectedDate] = useState(moment(oldBooking.date));
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);
  const [duration, setDuration] = useState(null);
  const [availableCourts, setAvailableCourts] = useState([]);

  const getFreeStartTime = async (id, selectedDate) => {
    const data = await getFreeTimeByDateAPI(id, selectedDate);
    setTimeOptions(data.freeStartTime);
  };

  const getAvailableDuration = async (centerId, date, startTime) => {
    const data = await getAvailableDurationAPI(centerId, date, startTime);
    let maxDuration = data.maxDuration;
    let listduration = [];
    while (maxDuration > 0) {
      console.log("maxDuration", maxDuration);
      listduration = [...listduration, maxDuration];
      maxDuration -= 0.5;
    }
    setDurationOptions(listduration);
  };

  const getAvailableCourt = async (centerId, date, startTime, duration) => {
    const data = await getAvailableCourtAPI(
      centerId,
      date,
      startTime,
      duration
    );
    setAvailableCourts(data.courtFree);
  };

  useEffect(() => {
    if (!selectedDate) return;
    getFreeStartTime(oldBooking.centerId, selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (!startTime || !selectedDate) return;
    getAvailableDuration(oldBooking.centerId, selectedDate, startTime);
  }, [selectedDate, startTime]);

  useEffect(() => {
    if (!startTime || !selectedDate || !duration) return;
    getAvailableCourt(oldBooking.centerId, selectedDate, startTime, duration);
  }, [selectedDate, startTime, duration]);

  const handleSelectedDay = (date) => {
    const dateObject = new Date(date);
    const utcDateObject = new Date(
      dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
    );
    // Format the date to "YYYY-MM-DD"
    const formattedDate = utcDateObject.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  };
  useEffect(() => {
    if (currentStep === 0 && selectedDate) {
      setCurrentStep(1);
    } else if (currentStep === 1 && startTime && duration) {
      setCurrentStep(2);
    }
  }, [selectedDate, startTime, duration]);

  return (
    <div>
      <Steps
        direction="vertical"
        current={currentStep}
        style={{ height: "100%", padding: "10px" }}
      >
        <Step
          title="Chọn ngày"
          description={
            <div>
              <DatePicker
                placeholder="Chọn ngày"
                onChange={(date) => handleSelectedDay(date)}
                disabledDate={(current) =>
                  current &&
                  (current.isBefore(moment().startOf("day")) ||
                    current.isAfter(moment().add(7, "days").startOf("day")))
                }
                style={{
                  width: "100%",
                  height: "50px",
                  margin: "16px 0",
                }}
              />
            </div>
          }
        />
        <Step
          title="Chọn giờ bắt đầu và số giờ chơi"
          description={
            currentStep >= 1 && (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <Select
                  placeholder="Giờ bắt đầu"
                  style={{
                    width: "100%",
                    height: "50px ",
                    margin: "8px 0",
                  }}
                  onChange={(value) => setStartTime(value)}
                >
                  {timeOptions?.map((time) => (
                    <Option key={time} value={time}>
                      {time}
                    </Option>
                  ))}
                </Select>
                <Select
                  placeholder="Số giờ chơi"
                  style={{
                    width: "100%",
                    height: "50px ",
                    margin: "8px 0",
                  }}
                  onChange={(value) => setDuration(value)}
                >
                  {durationOptions.map((duration) => (
                    <Option key={duration} value={duration}>
                      {duration} giờ
                    </Option>
                  ))}
                </Select>
              </div>
            )
          }
        />
        <Step
          title="Chọn các sân"
          description={
            currentStep >= 2 && (
              <div
                style={{
                  marginTop: 16,
                  borderRadius: "10px",
                  padding: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    maxHeight: "300px",
                    overflowY: "scroll",
                    paddingRight: "16px",
                  }}
                >
                  <List
                    grid={{
                      gutter: 16,
                      column: 1,
                      width: "100%",
                      height: "50px ",
                      margin: "16px 0",
                    }}
                    dataSource={availableCourts}
                    renderItem={(court) => (
                      <List.Item key={court._id}>
                        <Card>
                          <Row align="center" justify="space-between">
                            <Col align="center" justify="center">
                              <Row>
                                <strong>Sân {court.courtNumber}</strong>
                              </Row>
                              <Row>Giá: {formatPrice(court?.price)}đ</Row>
                            </Col>
                            <Col>
                              {/* <Button
                                    type="primary"
                                    onClick={() => handleAddToCart(court)}
                                    disabled={selectedCourts.some(
                                      (selectedCourt) =>
                                        selectedCourt._id === court._id
                                    )}
                                  >
                                    Thêm vào giỏ
                                  </Button> */}
                            </Col>
                          </Row>
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            )
          }
        />
      </Steps>
    </div>
  );
}
