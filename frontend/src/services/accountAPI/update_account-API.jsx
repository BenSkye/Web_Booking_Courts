
import Cookies from "js-cookie";
import {putData} from '../fetchAPI/index'
import { jwtDecode } from "jwt-decode";


const Updateuser = async (userName, userPhone, avatar) => {
    const [user, setUser] = useState(null);
    const token = Cookies.get("jwtToken");
    const response = await putData(
      "http://localhost:5050/api/v1/user/update",
      {
        userName: userName,
        userPhone: userPhone,
        avatar: avatar,
      },
      token
    );
    console.log("response", response);
    if (response && response.data) {
      const token = response.data.token;
  
      if (token) {
        Cookies.set("jwtToken", token, { expires: 60 });
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        return decodedToken;
      }
    }
    return null;
  };
  export default Updateuser;