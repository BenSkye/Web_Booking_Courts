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
        <Route path="/bookingdetail/:id" element={<BookingDetail />} />
        <Route path="/user" element={<ProfileAccount />} />
        <Route path="/user/my-account" element={<ProfileAccount/>} />
        <Route path="/user/update-password" element={<ProfileAccount/>} />
        <Route
          path="/registerPackageCourt"
          element={<RegisterPackageCourt />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default Routing;
