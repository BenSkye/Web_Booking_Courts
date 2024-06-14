import { Routes, Route } from "react-router-dom";
import LayoutMain from "@/components/layouts";
import Home from "@/pages/home";
import AboutUs from "@/components/dashboard/aboutUs";
import Partner from "@/pages/courtManage/partner";
import Tournament from "@/pages/tournament";
import Login from "@/pages/login/login";
import SignUp from "@/pages/login/signup";
import Detail from "@/pages/detail/detail";
import BookingDetail from "@/components/booking/bookingDetails";
import ProfileAccount from "../pages/account/profileAccount/index";

import RegisterPackageCourt from "@/pages/courtManage/registerPackageCourt";
import TournamentCreate from "@/pages/tournamentCreate";
import RegistTournamentForm from "@/pages/tournamentCreate/components/RegistTournamentForm";
import CourtManage from "@/pages/courtManage";
import TournamentDetail from "../pages/TournamentDetail";
import CourtManageDetail from "../pages/courtManage/courtManageDetail";
import PaymentBookingFixed from "../components/booking/bookingDetails/bookingFixedByMonth/components/payment/paymentBookingFixed";
import ManagerDashboar from "@/pages/courtManage/ManagerDashboard";
import ManagerCalendar from "../pages/courtManage/ManagerCalendar";
import SignupPartner from "../pages/login/signupPartner";
import BookingCourtDirectly from "../pages/BookingCourtDirectly/BookingCourtDirectly";
import RequestToOrganizeATournament from "../pages/RequestToOrganizeATournament/RequestToOrganizeATournament";
import ManageCenter from  "../pages/courtManage/manageCourtByAdmin/manageCenter";
import AdminDashboard from "../pages/courtManage/manageCourtByAdmin/adminManage"
import UserManagement from "../pages/courtManage/manageCourtByAdmin/managePeople"
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/tournament/create" element={<TournamentCreate />} />
        <Route
          path="/tournament/create/:centerID"
          element={<RegistTournamentForm />}
        />
        {/* <Route
          path="/tournament/detail/:tournamentID"
          element={<TournamentDetail />}
        /> */}
        <Route path="/bookingdetail/:id" element={<BookingDetail />} />
        <Route path="/user" element={<ProfileAccount />} />
        <Route path="/user/my-account" element={<ProfileAccount />} />
        <Route path="/user/update-password" element={<ProfileAccount />} />
        <Route path="/user/bill" element={<ProfileAccount />} />
        <Route path="/user/booking-court" element={<ProfileAccount />} />
        <Route path="/paymentBookingFixed" element={<PaymentBookingFixed />} />
        <Route
          path="/courtManage/registerPackageCourt"
          element={<RegisterPackageCourt />}
        />

        <Route path="/courtManage" element={<CourtManage />} />
        <Route path="/courtManage/detail/:id" element={<CourtManageDetail />} />
        <Route path="/courtManage/Dashboard" element={<ManagerDashboar />} />
        <Route
          path="/courtManage/BookingCourtDirectly"
          element={<BookingCourtDirectly />}
        />
        <Route
          path="/courtManage/RequestToOrganizeATournament"
          element={<RequestToOrganizeATournament />}
        />
        <Route
          path="/courtManage/ManagerCalendar"
          element={<ManagerCalendar />}
        />
        <Route path="/courtManage/partner" element={<Partner />} />
        <Route
          path="/admin/manageCenter"
          element={<ManageCenter />}
        />
          <Route path="/admin/Dashboard" element={<AdminDashboard />} />
          <Route path="/admin/UserManagement" element={<UserManagement />} />
        <Route path="" />
      </Route>
    
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signupPartner" element={<SignupPartner />} />
    </Routes>
  );
}

export default Routing;
