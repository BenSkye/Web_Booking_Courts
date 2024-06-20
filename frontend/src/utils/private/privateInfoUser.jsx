import {Outlet, Navigate} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRouteInfoUser = () =>{
let auth = {'token': false}
return(
   auth.token ? <Outlet/> : <Navigate to="/user/my-account"/>
)
}

export default PrivateRouteInfoUser