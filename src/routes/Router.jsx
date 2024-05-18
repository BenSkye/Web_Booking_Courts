import { Routes, Route } from 'react-router-dom';
import LayoutMain from '@/components/layouts';
import Home from '@/pages/home';
import AboutUs from '@/components/dashboard/aboutUs';
import Partner from '@/components/dashboard/partner';
import Tournament from '@/components/dashboard/tournament';
import Login from '../pages/login';
import SignUp from '../pages/signup';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/partner' element={<Partner />} />
        <Route path='/tournament' element={<Tournament />} />

      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
    </Routes>
  );
}

export default Routing;
