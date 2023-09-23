import React, { useState } from "react";
import StudentTopNav from "../../components/student/StudentTopNav";
import { useNavigate } from "react-router-dom";
import StudentConsumption from "../../components/student/consumption/StudentConsumption";

export default function StudentConsumptionPage() {
  const [state, setState] = useState(0);
  const navbarMenu = ["소비 신청하기", "소비 신청 내역 보기", "소비 완료 내역 보기"];
  const divStyle = {
    width: "15%",
  };
  const heightStyle = {
    height: "83%",
  };
  const isActive = (index) => {
    if (state === index) {
      return true;
    }
    return false;
  };

  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate("/student/nation");
  };
  const navigateMenu = (index) => {
    setState(index);
  };
  const navbar = navbarMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => navigateMenu(index)}
      className={`my-3 border border-dark hoverable border-3 text-center p-3 rounded-pill sideNav ${
        isActive(index) ? "bg-warning text-white" : ""
      }`}
      style={{ backgroundColor: "#FFFEEE" }}
    >
      {menu}
    </div>
  ));
  return (
    <div className="h-100">
      <StudentTopNav />
      <div className="d-flex justify-content-around m-3" style={heightStyle}>
        <div style={divStyle}>
          {navbar}
          <div className="d-flex justify-content-center ">
            <div className="mb-5" style={{ position: "absolute", bottom: 0 }}>
              <div className="border border-dark bg-white border-3 text-center p-3 rounded-pill">
                빨리 고르고 가!
              </div>
              <div className="kiki hoverable m-auto" onClick={navigateToMain}></div>
            </div>
          </div>
        </div>
        <StudentConsumption state={state} />
      </div>
    </div>
  );
}
