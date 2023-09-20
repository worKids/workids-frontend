import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "Teacher.css";
export default function TeacherSideNav() {
  const navbarMenu = [
    "회원 정보 수정",
    "비밀번호 변경",
    "회원 탈퇴", 
  ];
  const divStyle = {
    width: "15%",
  };
  const navigateMenu = ["law", "job", "bank", "auction", "consumption", "citizen", "nation"];
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
      className={`my-3 border border-dark  border-3 text-center p-3 rounded-pill sideNav ${
        isActive(index) ? "bg-warning text-white" : ""
      }`}
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
