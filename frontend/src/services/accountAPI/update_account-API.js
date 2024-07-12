import { putData  } from "../fetchAPI/index";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const Updateuser = async (userName, userPhone, avatar,userAddress) => {
  const response = await putData(`${apiBaseUrl}/user/update`, {
    userName: userName,
    userPhone: userPhone,
    avatar: avatar,
    userAddress: userAddress,
  });
  console.log("response", response);

  if (response && response.data) {
    return response.data;
  }
  return null;
};
export default Updateuser;
