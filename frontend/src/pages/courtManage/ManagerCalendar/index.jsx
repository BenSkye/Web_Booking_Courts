import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Calendar from "./components/calendar";
import ChooseDay from "./components/chooseDay";

export default function ManagerCalendar() {
  const listCenter = [
    {
      id: 1,
      name: "Sân cầu Tada",
    },
    {
      id: 2,
      name: "Sân Cây Lộc Vừng",
    },
  ];
  return (
    <>
      <Tabs tabPosition="left">
        {listCenter.map((center, index) => (
          <TabPane tab={center.name} key={index}>
            <ChooseDay />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}
