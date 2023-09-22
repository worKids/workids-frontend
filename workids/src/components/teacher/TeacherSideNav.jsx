import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Teacher.css";
export default function TeacherSideNav() {
  const navbarMenu = [
    "법 관리",
    "직업 관리",
    "소비 관리",
    "은행 관리",
    "부동산 관리",
    "국민 관리",
    "나라 운영",
  ];
  const divStyle = {
    width: "15%"
  };
  const navigateMenu = ["law", "job", "consumption", "bank", "auction", "citizen", "nation"];
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (index) => {
    const pathParts = location.pathname.split("/"); 
    return pathParts[pathParts.length - 1] === navigateMenu[index];
  };
  const navigateTo = (idx) => {
    navigate(`/teacher/${navigateMenu[idx]}`);
  };
  const navbar = navbarMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => navigateTo(index)}
      className={`my-4 border border-dark hoverable border-3 text-center p-3 rounded-pill sideNav ${
        isActive(index) ? "bg-warning text-white" : ""
      }`}style={{backgroundColor:"#FFFEEE"}}
    >
      {menu}
    </div>
  ));
  return (
    <div className="mx-3" style={divStyle}>
      {navbar}
    </div>
  );
}
