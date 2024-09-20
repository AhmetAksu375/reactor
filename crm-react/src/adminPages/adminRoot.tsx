// src/pages/management/Management.jsx

import { authController } from "@/utils/jwtHelper";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./auth/adminLogin";
import SidebarAdmin from "@/compenents/SidebarAdmin";
import MainPage from "./MainPage";
import UserTransections from "./UserTransections";
import AdminLoginHeader from "@/compenents/AdminLoginHeader";
import AdminTransections from "./AdminTransections";
import Departments from '@/adminPages/Departments'
interface Userrole {
  aud: string;
}

const CompanyRoot = () => {
  const controlrole: Userrole = authController() || { aud: "" };
  const location = useLocation();
  const mainpath = location.pathname.startsWith("/");
  return (
    <div className="pt-20">
      <div className={mainpath && controlrole.aud === "admin" ? "" : "hidden"}>
        <SidebarAdmin />
      </div>
      <div className={mainpath && controlrole.aud === "" ? "" : "hidden"}>
        <AdminLoginHeader />
      </div>
      <Routes>
        <Route
          path="/"
          element={controlrole.aud === "admin" ? <MainPage /> : <AdminLogin />}
        />
        <Route
          path="/admintransections"
          element={
            controlrole.aud === "admin" ? <UserTransections /> : <AdminLogin />
          }
        />
        <Route
          path="/usertransections"
          element={
            controlrole.aud === "admin" ? <AdminTransections /> : <AdminLogin />
          }
        />
        <Route
          path="/departments"
          element={
            controlrole.aud === "admin" ? <Departments /> : <AdminLogin />
          }
        />
      </Routes>
    </div>
  );
};
export default CompanyRoot;
