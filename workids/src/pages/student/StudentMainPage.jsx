import React, { useState } from "react";
import StudentTopNav from "../../components/student/StudentTopNav";

export default function StudentMainPage() {
  const rightDivStyle = {
    height: "35%",
  };

  const rightBottomDiv = {
    height: "60%",
    borderRadius: "40px",
  };
  const mainNav = {
    height: "35%",
  };

  const borderRound = {
    borderRadius: "60px",
  };
  return (
    <div className="h-100">
      <StudentTopNav />
      <div className="d-flex justify-content-between py-3 px-5" style={mainNav}>
        <div className="w-50 border border-dark  border-3 m-4 p-3" style={borderRound}>
          나라 법
        </div>
        <div className="w-50 m-3">
          <div className="d-flex" style={rightDivStyle}>
            <div className="w-50 border border-dark  border-3 mx-3 p-3" style={borderRound}>
              자산
            </div>
            <div className="w-50 border border-dark  border-3 m-1 p-3" style={borderRound}>
              신용도
            </div>
          </div>
          <div className="border border-dark  border-3  m-1 p-3" style={rightBottomDiv}>
            직업
            <li>우유 가져오기</li>
          </div>
        </div>
      </div>
    </div>
  );
}
