import React, { useState } from "react";
import StudentTopNav from "../../components/student/StudentTopNav";
import StudentAuction from "../../components/student/StudentAuction";

export default function StudentAuctionPage() {
  const [state, setState] = useState(0);
  const navbarMenu = ["진행중인 경매", "경매 내역 보기"];
  const divStyle = {
    width: "15%",
  };
  const heightStyle = {
    height: "80%",
  };
  const isActive = (index) => {
    if (state === index) {
      return true;
    }
    return false;
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
      <div className="d-flex" style={heightStyle}>
        <div className="mx-3" style={divStyle}>
          {navbar}
        </div>
        <StudentAuction state={state} />
      </div>
    </div>
  );
}
