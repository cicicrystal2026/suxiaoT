import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAdmin } from './lib/auth';

import Home from './screens/mobile/Home';
import ChatAssistant from './screens/mobile/ChatAssistant';
import ArrivalResult from './screens/mobile/ArrivalResult';
import Reminders from './screens/mobile/Reminders';
import CustomerService from './screens/mobile/CustomerService';
import IPChat from './screens/mobile/IPChat';
import TripPlanner from './screens/mobile/TripPlanner';
import RouteRec from './screens/mobile/RouteRec';
import ThemeRoutes from './screens/mobile/ThemeRoutes';
import CommerceGuide from './screens/mobile/CommerceGuide';
import AttractionDetail from './screens/mobile/AttractionDetail';
import CouponCenter from './screens/mobile/CouponCenter';
import SeasonIP from './screens/mobile/SeasonIP';
import PosterMaker from './screens/mobile/PosterMaker';
import ARCheckin from './screens/mobile/ARCheckin';
import PointsMall from './screens/mobile/PointsMall';
import StationScan from './screens/mobile/StationScan';
import RealNameAuth from './screens/mobile/RealNameAuth';
import Profile from './screens/mobile/Profile';

import AdminLogin from './screens/admin/AdminLogin';
import AdminDashboard from './screens/admin/AdminDashboard';
import AdminKB from './screens/admin/AdminKB';
import AdminActivity from './screens/admin/AdminActivity';
import AdminCoupon from './screens/admin/AdminCoupon';
import AdminPush from './screens/admin/AdminPush';
import AdminRoute from './screens/admin/AdminRoute';
import AdminUser from './screens/admin/AdminUser';
import AdminRole from './screens/admin/AdminRole';

// 后台路由守卫：未登录跳转到登录页
function RequireAdmin({ children }) {
  return isAdmin() ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Mobile C-end */}
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/arrival" element={<ArrivalResult />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/service" element={<CustomerService />} />
        <Route path="/ip-chat" element={<IPChat />} />
        <Route path="/planner" element={<TripPlanner />} />
        <Route path="/route" element={<RouteRec />} />
        <Route path="/theme-routes" element={<ThemeRoutes />} />
        <Route path="/guide" element={<CommerceGuide />} />
        <Route path="/detail" element={<AttractionDetail />} />
        <Route path="/coupon" element={<CouponCenter />} />
        <Route path="/season" element={<SeasonIP />} />
        <Route path="/poster" element={<PosterMaker />} />
        <Route path="/ar" element={<ARCheckin />} />
        <Route path="/mall" element={<PointsMall />} />
        <Route path="/station" element={<StationScan />} />
        <Route path="/realname" element={<RealNameAuth />} />
        <Route path="/me" element={<Profile />} />

        {/* Admin B-end */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/admin/kb" element={<RequireAdmin><AdminKB /></RequireAdmin>} />
        <Route path="/admin/activity" element={<RequireAdmin><AdminActivity /></RequireAdmin>} />
        <Route path="/admin/coupon" element={<RequireAdmin><AdminCoupon /></RequireAdmin>} />
        <Route path="/admin/push" element={<RequireAdmin><AdminPush /></RequireAdmin>} />
        <Route path="/admin/route" element={<RequireAdmin><AdminRoute /></RequireAdmin>} />
        <Route path="/admin/user" element={<RequireAdmin><AdminUser /></RequireAdmin>} />
        <Route path="/admin/role" element={<RequireAdmin><AdminRole /></RequireAdmin>} />
      </Routes>
    </BrowserRouter>
  );
}
