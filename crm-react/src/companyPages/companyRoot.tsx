// src/pages/management/Management.jsx
import Sidebar from "@/compenents/Sidebar";
import { authController } from "@/utils/jwtHelper";
import { Route, Routes, useLocation } from "react-router-dom";
import AddUser from "./addUser";
import Home from "./home";
import LoginCompany from "./login";
import MainPage from "./management/mainPage";
import UserTransections from "./management/userTransections";
import Registerr from "./registerr";
import CompanyLoginHeader from "@/compenents/companyLoginHeader";
import Addwork from "./addwork";
import CompanyBills from "./CompanyBills";

interface Userrole {
  aud: string;
}

const CompanyRoot = () => {
  const controlrole: Userrole = authController() || { aud: "" };
  const location = useLocation();
  const mainpath = location.pathname.startsWith("/");
  return (
    <div className="pt-10">
      <div className={mainpath && controlrole.aud === "admin" ? "" : "hidden"}>
        <Home />
      </div>
      <div
        className={
          (mainpath && controlrole.aud === "company") ||
          controlrole.aud === "employee"
            ? ""
            : "hidden"
        }
      >
        <Sidebar />
      </div>
      <div className={mainpath && controlrole.aud === "" ? "" : "hidden"}>
        <CompanyLoginHeader />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            controlrole.aud === "company" || controlrole.aud === "employee" ? (
              <MainPage />
            ) : (
              <LoginCompany />
            )
          }
        />
        <Route
          path="/addwork"
          element={
            controlrole.aud === "company" || controlrole.aud === "employee" ? (
              <Addwork />
            ) : (
              <LoginCompany />
            )
          }
        />
        <Route
          path="/login"
          element={
            controlrole.aud === "company" || controlrole.aud === "employee" ? (
              <MainPage />
            ) : (
              <LoginCompany />
            )
          }
        />
        <Route
          path="/register"
          element={
            controlrole.aud === "company" || controlrole.aud === "employee" ? (
              <MainPage />
            ) : (
              <Registerr />
            )
          }
        />
        <Route
          path="/addUser"
          element={
            controlrole.aud === "company" || controlrole.aud === "employee" ? (
              <AddUser />
            ) : (
              <LoginCompany />
            )
          }
        />
        <Route
          path="/usertransections"
          element={
            controlrole.aud === "employee" || controlrole.aud === "company" ? (
              <UserTransections />
            ) : (
              <LoginCompany />
            )
          }
        />
        <Route
          path="/bills"
          element={
            controlrole.aud === "employee" || controlrole.aud === "company" ? (
              <CompanyBills />
            ) : (
              <LoginCompany />
            )
          }
        />
      </Routes>
    </div>
  );
};
export default CompanyRoot;
