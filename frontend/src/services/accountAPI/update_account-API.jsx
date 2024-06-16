import { putData } from "../fetchAPI/index";

const Updateuser = async (userName, userPhone, avatar) => {
  const response = await putData(
    "http://localhost:5050/api/v1/user/update",
    {
      userName: userName,
      userPhone: userPhone,
      avatar: avatar,
    });
  console.log("response", response);
  if (response && response.data) {
   return response.data
  }
  return null;
};
export default Updateuser;
