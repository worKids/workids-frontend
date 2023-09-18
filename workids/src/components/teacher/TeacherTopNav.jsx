import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import "./Teacher.css";
import TeacherNavModal from "./TeacherNavModal";
export default function TeacherTopNav() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const divStyle = {
    height: "10vh",
  };
  const navigateToSelect = () => {
    navigate("/select");
  };

  return (
    <div style={divStyle} className="fs-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="m-3" onClick={navigateToSelect}>
            로고 칸
          </div>
          <div className="m-3">{userData.userName} 선생님</div>
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
        <TeacherNavModal />
      </div>
    </div>
  );
}
