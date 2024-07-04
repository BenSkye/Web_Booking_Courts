import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import { getPersonalActiveCenter } from "../../../services/partnerAPI";
import ListTournamentInCenter from "./components/listTournamentInCenter";

function RequestToOrganizeATournament() {
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
            <ListTournamentInCenter centerId={center._id} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default RequestToOrganizeATournament;
