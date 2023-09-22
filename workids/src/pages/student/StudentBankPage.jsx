import React, { useState } from "react";
import StudentTopNav from "../../components/student/StudentTopNav";
import { useNavigate } from "react-router-dom";
import StudentBank from "../../components/student/bank/StudentBank";

export default function StudentBankPage() {
  const [state, setState] = useState(0);
  const navbarMenu = ["내 계좌 조회하기", "상품 가입하기"];
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
      className={`my-3 border border-dark  border-3 text-center p-3 rounded-pill sideNav ${
        isActive(index) ? "bg-warning text-white" : ""
      }`}
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
                무엇을 도와드릴까요!!
              </div>
              <div className="ageo m-auto" onClick={navigateToMain}></div>
            </div>
          </div>
        </div>
        <StudentBank state={state} />
      </div>
    </div>
  );
}
