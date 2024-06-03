import axios from "axios";
import { postData } from "../fetchAPI";

const Register = async (newUser) => {
  try {
    const response = await fetch("http://localhost:5050/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Error posting data:", response.status);
    }
  } catch (error) {
    console.error("Error posting data:", error.message);
  }
};

export default Register;
