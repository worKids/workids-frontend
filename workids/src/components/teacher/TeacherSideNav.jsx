import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TeacherSideNav() {
  const navbarMenu = [
    "법 관리",
    "직업 관리",
    "은행 관리",
    "부동산 관리",
    "소비 관리",
    "국민 관리",
    "나라 운영",
  ];
  const divStyle = {
    width: "15%",
  };
  const navigateMenu = ["law", "job", "bank", "auction", "consumption", "citizen", "nation"];
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (index) => {
    const pathParts = location.pathname.split("/"); // 현재 경로를 "/"로 나눠 배열로 만듭니다.
    return pathParts[pathParts.length - 1] === navigateMenu[index];
  };
  const navigateTo = (idx) => {
    navigate(`/teacher/${navigateMenu[idx]}`);
  };
  const navbar = navbarMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => navigateTo(index)}
      className={`fs-2 my-3 border text-center p-3 rounded-pill ${
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
