// eslint-disable-next-line no-unused-vars
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// eslint-disable-next-line no-unused-vars
import { app } from "../../utils/firebase/firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../services/authAPI/authProvideAPI";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleGoogleClick } = useContext(AuthContext);
  
  const handleSignInGG = async () => {
    const data = await handleGoogleClick();
    if (data) {
      dispatch(signInSuccess(data));
      navigate("/");

      // Extract email and name from data
      // const { mail, name,password } = data.data.user;

      // Send welcome email
      
    } else {
      console.log("Email hoặc mật khẩu không đúng!");
    }
  };
  return (
    <button
      type="button"
      onClick={() => handleSignInGG()}
      className="logingoogle"
      style={{
        width: "270px",
        height: "33px",
        backgroundColor: "#fff",
        color: "black",
        borderRadius: "5px",
      }}
    >
      Đăng nhập bằng Google{" "}
    </button>
  );
}
