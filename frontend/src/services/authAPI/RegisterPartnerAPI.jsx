import axios from "axios";
import { postData } from "../fetchAPI";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const RegisterPartner = async (newUser) => {
  const response = await postData(
    `${apiBaseUrl}/auth/registerPartner`,
    newUser,
    null
  );
  return response;
};
export default RegisterPartner;
