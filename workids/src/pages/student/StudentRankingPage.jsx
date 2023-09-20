import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentTopNav from "../../components/student/StudentTopNav";
import StudentRank from "../../components/student/ranking/StudentRank";

export default function StudentRankingPage() {
  const [state, setState] = useState(0);
  const navbarMenu = ["진행중인 경매", "경매 내역 보기"];
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
              <div className="border border-dark  border-3 text-center p-3 rounded-pill">
                여긴 랭킹임
              </div>
              <div className="ccoli" onClick={navigateToMain}></div>
            </div>
          </div>
        </div>
        <StudentRank state={state} />
      </div>
    </div>
  );
}
