import axios from "axios";
import { postData } from "../fetchAPI";

const RegisterPartner = async (newUser) => {
  const response = await postData(
    "http://localhost:5050/api/v1/auth/registerPartner",
    newUser
  );
  return response;
};
export default RegisterPartner;
