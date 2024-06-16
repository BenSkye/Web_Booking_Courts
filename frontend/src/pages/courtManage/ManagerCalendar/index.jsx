import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Calendar from "./components/calendar";
import ChooseDay from "./components/chooseDay";
import { useEffect, useState } from "react";
import { getPersonalActiveCenter } from "../../../services/partnerAPI";

export default function ManagerCalendar() {
  const [listCenter, setListCenter] = useState([]);
  const getListActiveCenter = async () => {
    const data = await getPersonalActiveCenter();
    console.log("Data:", data);
    setListCenter(data.center);
  };
  useEffect(() => {
    getListActiveCenter();
  }, []);
  useEffect(() => {
    console.log("List center:", listCenter);
  }, [listCenter]);
  return (
    <>
      <Tabs tabPosition="left">
        {listCenter.map((center, index) => (
          <TabPane tab={center.centerName} key={index}>
            <ChooseDay center={center} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}
