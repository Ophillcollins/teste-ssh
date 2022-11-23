import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes as GroupRoutes,
} from 'react-router-dom';

import { useAuthContext } from '../context/authContext';
import Home from '../pages/home';
import Calculator from '../pages/calculator';
import StoredCalculations from '../pages/storedCalculations';
import Emissions from '../pages/emissions';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import ResetPassword from '../pages/resetPassword';
import OrderInfo from '../pages/orderInfo';
import Checkout from '../pages/checkout';
import SignatureConfirmation from '../pages/signatureConfirmation';
import DashboardHome from '../pages/dashboardHome';
import DashboardCalculator from '../pages/dashboardCalculator';
import DashboardCompensations from '../pages/dashboardCompensations';
import DashboardCalculations from '../pages/dashboardCalculations';
import DashboardEmissions from '../pages/dashboardEmissions';
import DashboardUserProfile from '../pages/DashboardUserProfile';
import DashboardManageUser from '../pages/dashboardManageUser';
import DashboardManageCompanies from '../pages/dashboardManageCompanies';

function CustomRoute() {
  const { authenticated } = useAuthContext();
  if (authenticated) {
    return <Outlet />;
  }
  return <Navigate replace to="/signin" />;
}

function Routes() {
  return (
    <HashRouter>
      <GroupRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator/" element={<Calculator />} />
        <Route path="/stored/calculations/" element={<StoredCalculations />} />
        <Route path="/emissions/" element={<Emissions />} />
        <Route path="/signin/" element={<Signin />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/reset/password" element={<ResetPassword />} />
        <Route path="/checkout-info/" element={<OrderInfo />} />
        <Route
          path="/signature/confirmation/"
          element={<SignatureConfirmation />}
        />

        <Route element={<CustomRoute />}>
          <Route path="/checkout/" element={<Checkout />} />
          <Route path="/dashboard-home/" element={<DashboardHome />} />
          <Route
            path="/dashboard-calculator/"
            element={<DashboardCalculator />}
          />
          <Route
            path="/dashboard-emissions/"
            element={<DashboardEmissions />}
          />
          <Route
            path="/dashboard-compensations/"
            element={<DashboardCompensations />}
          />
          <Route
            path="/dashboard-calculations/"
            element={<DashboardCalculations />}
          />
          <Route path="/manage/users" element={<DashboardManageUser />} />

          <Route
            path="/manage/companies"
            element={<DashboardManageCompanies />}
          />

          <Route path="/user/profile/" element={<DashboardUserProfile />} />
        </Route>
      </GroupRoutes>
    </HashRouter>
  );
}

export { Routes };
