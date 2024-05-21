import { Routes, Route } from 'react-router-dom';
import LayoutMain from '@/components/layouts';
import Home from '@/pages/home';
import AboutUs from '@/components/dashboard/aboutUs';
import Partner from '@/components/dashboard/partner';
import Tournament from '@/components/dashboard/tournament';
import Login from '@/pages/login/login';
import SignUp from '@/pages/login/signup';
import Detail from '@/pages/detail/detail';
import BookingDetail from '@/components/booking/bookingDetails';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/partner' element={<Partner />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/tournament' element={<Tournament />} />
        <Route path='/bookingdetail/:id' element={<BookingDetail />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default Routing;
