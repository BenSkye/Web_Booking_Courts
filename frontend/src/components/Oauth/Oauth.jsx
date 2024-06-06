import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../services/authAPI/authProvideAPI';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleGoogleClick} = useContext(AuthContext);
  // const handleGoogleClick = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const auth = getAuth(app);

  //     const result = await signInWithPopup(auth, provider);
  //     const res = await fetch('http://localhost:5050/api/v1/auth/google', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: result.user.displayName,
  //         email: result.user.email,
  //         photo: result.user.photoURL,
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     dispatch(signInSuccess(data));
  //     navigate('/');
  //   } catch (error) {
  //     console.log('could not login with google', error);
  //   }
  // };
  const handleSignInGG = async () => {
    const data = await handleGoogleClick();
    if (data) {
      dispatch(signInSuccess(data));
      navigate("/");
    } else {
      console.log("Email hoặc mật khẩu không đúng!")
    }
  }
  return (
    <button
      type='button'
      onClick={() => handleSignInGG()}
      className='logingoogle' 
      style={{
         width: "270px",
         height: "33px",
         backgroundColor: "#fff",
         color: "black",
         borderRadius: "5px"
      }}
    >
      Continue with google
    </button>
  );
}