import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function StudentJobPage() {
  const [state, setState] = useState(0);
  const navbarMenu = ["전체 직업보기", "내 직업 보기"];
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
    navigate("/student");
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
              <div className="border border-dark  border-3 text-center p-3 rounded-pill">
                무슨 직업을 가질까?
              </div>
              <div className="bibi" onClick={navigateToMain}></div>
            </div>
          </div>
        </div>
        <StudentJob state={state} />
      </div>
    </div>
  );
}