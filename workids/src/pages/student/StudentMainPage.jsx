import React from "react";
import StudentTopNav from "../../components/student/StudentTopNav";
import "./student.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const navigateToConsumption = () => {
    navigate("/student/consumption");
  };
  const navigateToBank = () => {
    navigate("/student/bank");
  };
  const navigateToAuction = () => {
    navigate("/student/auction");
  };
  const navigateToRanking = () => {
    navigate("/student/ranking");
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
      <div className="d-flex justify-content-around">
        <div onClick={navigateToConsumption}>
          <div className="text-center">돈 쓰러가기(소비항목)</div>
          <div className="kiki"></div>
        </div>
        <div onClick={navigateToBank}>
          <div className="text-center">은행으로 가기</div>
          <div className="ageo"></div>
        </div>
        <div onClick={navigateToAuction}>
          <div className="text-center">부동산 정보 보기</div>
          <div className="lamu"></div>
        </div>
        <div onClick={navigateToRanking}>
          <div className="text-center">통계 보기</div>
          <div className="ccoli"></div>
        </div>
      </div>
    </div>
  );
}
