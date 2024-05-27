import { Routes, Route } from "react-router-dom";
import LayoutMain from "@/components/layouts";
import Home from "@/pages/home";
import AboutUs from "@/components/dashboard/aboutUs";
import Partner from "@/components/dashboard/partner";
import Tournament from "@/pages/tournament";
import Login from "@/pages/login/login";
import SignUp from "@/pages/login/signup";
import Detail from "@/pages/detail/detail";
import BookingDetail from "@/components/booking/bookingDetails";
import ProfileAccount from "@/pages/profileAccount";
import AccountSettingsForm from "@/pages/accountInformation";
import RegisterPackageCourt from "@/components/registerPackageCourt";
import TournamentCreate from "@/pages/tournamentCreate";
import RegistTournamentForm from "@/pages/tournamentCreate/components/RegistTournamentForm";
import CourtManage from "@/pages/courtManage";
import TournamentDetail from "../pages/TournamentDetail";
import UpdatePassword from '../pages/updatePassword/index';
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/tournament/create" element={<TournamentCreate />} />
        <Route
          path="/tournament/create/:centerID"
          element={<RegistTournamentForm />}
        />
        <Route
          path="/tournament/detail/:tournamentID"
          element={<TournamentDetail />}
        />
        <Route path="/bookingdetail/:id" element={<BookingDetail />} />
        <Route path="/user" element={<ProfileAccount />} />
        <Route path="/user/my-account/:id" element={<ProfileAccount/>} />
        <Route path="/user/update-password/:id" element={<UpdatePassword/>} />
        <Route path="/user/bill" element={<ProfileAccount/>} />
        <Route
          path="/registerPackageCourt"
          element={<RegisterPackageCourt />}
        />
        <Route path="/courtManage" element={<CourtManage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default Routing;
