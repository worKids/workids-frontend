import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import "./Teacher.css";
import NavModal from "../NavModal";
export default function TeacherTopNav() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const divStyle = {
    height: "10vh",
  };
  const navigateToSelect = () => {
    if (window.location.pathname === "/select") {
      navigate("/select");
    } else {
      navigate("/teacher/nation/main");
    }
  };

  return (
    <div style={divStyle} className="fs-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="logo hoverable" onClick={navigateToSelect}></div>
          <div className="my-3" >
            {userData.nationName ? userData.nationName : ""}
          </div>
          {userData.nationNum && (
            <div className="flag"></div>
          )}
        </div>
        <div
          className="m-3 fs-3 hoverable"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          마이페이지
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <NavModal />
      </div>
    </div>
  );
}
