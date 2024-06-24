import axios from "axios";
import { postData } from "../fetchAPI";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const Register = async (newUser) => {
  const response = await postData(
    `${apiBaseUrl}/auth/register`,
    newUser,
    null
  );
  return response;
};

export default Register;
