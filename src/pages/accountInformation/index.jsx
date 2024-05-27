// import React, { useState, useEffect } from "react";
// import { Button, Form, Input, Select, DatePicker, message } from "antd";
// import moment from "moment";
// import { AccountInformation, updateAccountInformation } from "@/services/accountAPI/update_account-API";; // Import hàm gọi API
// import { useParams } from 'react-router-dom';

// const { Option } = Select;

// const AccountSettingsForm = () => {
 
//   const [initialValues, setInitialValues] = useState(null);
//   const { id } = useParams();
//   useEffect(() => {
//     const fetchData = async () => {
     
//       try {
//         // Gọi API để lấy dữ liệu
//         const data = await AccountInformation(id); // Bạn cần cung cấp id hoặc các tham số khác nếu cần
//         setInitialValues({
//           'Họ và tên': data.Name,
//           'Email': data.Email,
//           'Số điện thoại': data.Phone,
//           'Giới tính': data.Gender,
//           'Ngày,tháng,năm sinh': moment(data.Birth, 'YYYY-MM-DD'),
//         });
//       } catch (error) {
//         console.error("Error fetching initial values:", error);
//         message.error('Có lỗi xảy ra khi tải thông tin tài khoản.');
//       }
//     };

//     fetchData();
//   }, []);

//   const onFinish = async (values) => {
//     const { id } = useParams();
//     try {
//       await updateAccountInformation(values); // Gọi hàm API cập nhật thông tin tài khoản
//       message.success('Cập nhật tài khoản thành công!');
//     } catch (error) {
//       console.error("Failed to update account information:", error);
//       message.error('Có lỗi xảy ra khi cập nhật tài khoản.');
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <Form
//       name="basic"
//       labelCol={{
//         span: 8,
//       }}
//       wrapperCol={{
//         span: 16,
//       }}
//       style={{
//         maxWidth: 600,
//         marginLeft: "450px",
//         marginTop: "130px",
//         height: "100vh",
//       }}
//       initialValues={initialValues}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <div
//         style={{
//           maxWidth: 600,
//           marginLeft: "180px",
//           marginBottom: '20px',
//           fontWeight: '700',
//           fontSize: '16px',
//           color: '#16056b',
//           display: 'flex',
//           justifyContent: 'center', 
//           paddingRight: 70,
//         }}
//       >
//         Cập nhật tài khoản
//       </div>
//       <Form.Item label="Họ và tên" name="Họ và tên" >
//         <Input  />
//       </Form.Item>

//       <Form.Item label="Email" name="Email">
//         <Input />
//       </Form.Item>

//       <Form.Item label="Số điện thoại" name="Số điện thoại">
//         <Input />
//       </Form.Item>
    

//       <Form.Item
//         name="Giới tính"
//         label="Giới tính"
//         rules={[
//           {
//             required: true,
//           },
//         ]}
//       >
//         <Select>
//           <Option value="male">Male</Option>
//           <Option value="female">Female</Option>
//           <Option value="other">Other</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item
//         label="Ngày,tháng,năm sinh"
//         name="Ngày,tháng,năm sinh"
//       >
//         <DatePicker />
//       </Form.Item>

//       <Form.Item
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Button type="primary" htmlType="submit">
//           Cập nhật tài khoản
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default AccountSettingsForm;

import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import moment from "moment";
import { AccountInformation, updateAccountInformation } from "@/services/accountAPI/update_account-API";
import { useParams } from 'react-router-dom';

const { Option } = Select;

const AccountSettingsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AccountInformation(id);
        const birthDate = moment.unix(data.Birth).format('YYYY-MM-DD');
        form.setFieldsValue({
          'Họ và tên': data.Name,
          'Email': data.Email,
          'Số điện thoại': data.Phone,
          'Giới tính': data.Gender,
          'Ngày,tháng,năm sinh': moment(birthDate, 'YYYY-MM-DD'), // Chuyển đổi dữ liệu từ chuỗi số thành đối tượng moment
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial values:", error);
        message.error('Có lỗi xảy ra khi tải thông tin tài khoản.');
        setLoading(false);
      }
    };

    fetchData();
  }, [form, id]);

  const onFinish = async (values) => {
    try {
      await updateAccountInformation(id, values);
      message.success('Cập nhật tài khoản thành công!');
    } catch (error) {
      console.error("Failed to update account information:", error);
      message.error('Có lỗi xảy ra khi cập nhật tài khoản.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      form={form}
      name="account-settings"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginLeft: "450px", marginTop: "130px", height: "100vh" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          maxWidth: 600,
          marginLeft: "180px",
          marginBottom: '20px',
          fontWeight: '700',
          fontSize: '16px',
          color: '#16056b',
          display: 'flex',
          justifyContent: 'center',
          paddingRight: 70,
        }}
      >
        Cập nhật tài khoản
      </div>
      <Form.Item label="Họ và tên" name="Họ và tên" >
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="Email">
        <Input />
      </Form.Item>

      <Form.Item label="Số điện thoại" name="Số điện thoại">
        <Input />
      </Form.Item>

      <Form.Item
        name="Giới tính"
        label="Giới tính"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ngày,tháng,năm sinh"
        name="Ngày,tháng,năm sinh"
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Cập nhật tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountSettingsForm;
