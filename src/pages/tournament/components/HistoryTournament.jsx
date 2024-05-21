import { Card, Pagination } from "antd";
import React, { useState } from "react";

const ListTournament = [
  {
    tenGiaiDau: "Giai Dau Cau Long Mua Xuan",
    tenToChuc: "Cau Lac Bo Cau Long Thanh Pho",
    diaChi: "123 Duong Nguyen Trai, Quan 1, Thanh Pho Ho Chi Minh",
    email: "contact@caulongtphcm.vn",
    soDienThoai: "0123456789",
    ngayKhaiMac: "2024-06-01",
    ngayBeMac: "2024-06-10",
    tenSanDau: "San Van Dong Hoa Lu",
    diaChiSanDau: "2 Dinh Tien Hoang, Quan 1, Thanh Pho Ho Chi Minh",
    coCauGiaiThuong:
      "giaiNhat-donNam: 10,000,000 VND, giaiNhi-donNam: 7,000,000 VND",
  },
  {
    tenGiaiDau: "Giai Dau Cau Long Mua Thu",
    tenToChuc: "Cau Lac Bo Cau Long Ha Noi",
    diaChi: "456 Duong Le Duan, Quan Hai Ba Trung, Ha Noi",
    email: "contact@caulonghanoi.vn",
    soDienThoai: "0987654321",
    ngayKhaiMac: "2024-09-01",
    ngayBeMac: "2024-09-10",
    tenSanDau: "San Van Dong My Dinh",
    diaChiSanDau: "20 Pham Hung, Quan Nam Tu Liem, Ha Noi",
    coCauGiaiThuong:
      "giaiNhat-donNam: 12,000,000 VND, giaiNhi-donNam: 8,000,000 VND",
  },
  {
    tenGiaiDau: "Giai Dau Cau Long Mua Dong",
    tenToChuc: "Cau Lac Bo Cau Long Da Nang",
    diaChi: "789 Duong Nguyen Van Linh, Quan Hai Chau, Da Nang",
    email: "contact@caulongdanang.vn",
    soDienThoai: "0369876543",
    ngayKhaiMac: "2024-12-01",
    ngayBeMac: "2024-12-10",
    tenSanDau: "San Van Dong Son Tra",
    diaChiSanDau: "15 Hoang Sa, Quan Son Tra, Da Nang",
    coCauGiaiThuong:
      "giaiNhat-donNam: 15,000,000 VND, giaiNhi-donNam: 10,000,000 VND",
  },
  {
    tenGiaiDau: "Giai Dau Cau Long Mua Mưa",
    tenToChuc: "Cau Lac Bo Cau Long Thanh Pho",
    diaChi: "123 Duong Nguyen Trai, Quan 1, Thanh Pho Ho Chi Minh",
    email: "contact@caulongtphcm.vn",
    soDienThoai: "0123456789",
    ngayKhaiMac: "2024-06-01",
    ngayBeMac: "2024-06-10",
    tenSanDau: "San Van Dong Hoa Lu",
    diaChiSanDau: "2 Dinh Tien Hoang, Quan 1, Thanh Pho Ho Chi Minh",
    coCauGiaiThuong:
      "giaiNhat-donNam: 10,000,000 VND, giaiNhi-donNam: 7,000,000 VND",
  },
  {
    tenGiaiDau: "Giai Dau Cau Long Mua Nồm",
    tenToChuc: "Cau Lac Bo Cau Long Ha Noi",
    diaChi: "456 Duong Le Duan, Quan Hai Ba Trung, Ha Noi",
    email: "contact@caulonghanoi.vn",
    soDienThoai: "0987654321",
    ngayKhaiMac: "2024-09-01",
    ngayBeMac: "2024-09-10",
    tenSanDau: "San Van Dong My Dinh",
    diaChiSanDau: "20 Pham Hung, Quan Nam Tu Liem, Ha Noi",
    coCauGiaiThuong:
      "giaiNhat-donNam: 12,000,000 VND, giaiNhi-donNam: 8,000,000 VND",
  },
  {
    tenGiaiDau: "Giai Dau Cau Long Mua Hè",
    tenToChuc: "Cau Lac Bo Cau Long Da Nang",
    diaChi: "789 Duong Nguyen Van Linh, Quan Hai Chau, Da Nang",
    email: "contact@caulongdanang.vn",
    soDienThoai: "0369876543",
    ngayKhaiMac: "2024-12-01",
    ngayBeMac: "2024-12-10",
    tenSanDau: "San Van Dong Son Tra",
    diaChiSanDau: "15 Hoang Sa, Quan Son Tra, Da Nang",
    coCauGiaiThuong:
      "giaiNhat-donNam: 15,000,000 VND, giaiNhi-donNam: 10,000,000 VND",
  },
];
const pageSize = 3;
export default function HistoryTournament() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <h1>Các giải đấu đã được tổ chức</h1>
      {ListTournament.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      ).map((tournament, index) => (
        <Card
          key={index}
          title={tournament.tenGiaiDau}
          extra={<a href="#">More</a>}
          bodyStyle={{ padding: "10px" }}
          headStyle={{ backgroundColor: "#f0f0f0", padding: "10px" }}
          style={{
            width: "100%",
            boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            margin: 0,
          }}
        >
          <p style={{ margin: 0, padding: 0 }}>
            {tournament.ngayKhaiMac}/{tournament.ngayBeMac}
          </p>
        </Card>
      ))}
      <Pagination
        current={currentPage}
        onChange={handleChange}
        pageSize={pageSize}
        total={ListTournament.length}
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      />
    </div>
  );
}
