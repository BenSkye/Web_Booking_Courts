import axios from "axios";
import { postData } from "../fetchAPI";

const Register = async (newUser) => {
  const response = await postData(
    "http://localhost:5050/api/v1/auth/register",
    newUser
  );
  return response;
};

export default Register;
