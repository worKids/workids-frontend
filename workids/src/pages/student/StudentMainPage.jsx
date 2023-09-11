import React, { useState } from "react";
import StudentTopNav from "../../components/student/StudentTopNav";
import "./student.css";
import { useNavigate } from "react-router-dom";
export default function StudentMainPage() {
  const [nationName, setNationName] = useState("삼다수나라");
  const [state, setState] = useState(0);
  const isActive = (index) => {
    if (state === index) {
      return true;
    }
    return false;
  };
  const nationData = [`${nationName}의 법`, `${nationName}의 직업`];

  const nationMap = nationData.map((data, index) => (
    <div
      key={index}
      onClick={() => setState(index)}
      className={`m-auto border border-dark border-3 w-50 mx-2 mt-3 text-center rounded-pill px-2 py-1 ${
        isActive(index) ? "bg-warning text-white" : ""
      }`}
    >
      {data}
    </div>
  ));
  const rightDivStyle = {
    height: "30%",
  };

  const rightBottomDiv = {
    height: "65%",
    borderRadius: "40px",
  };
  const mainNav = {
    height: "45%",
  };

  const borderRound = {
    borderRadius: "40px",
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
      <div className="d-flex justify-content-between m-3" style={mainNav}>
        <div className="w-50 border border-dark  border-3 mx-5 my-3 p-1" style={borderRound}>
          <div className="d-flex">{nationMap}</div>
          {state===0 ? (
            <div>
              법 넣기
            </div>
          ) : (
            <div>
              직업 넣기
            </div>
          )}
        </div>
        <div className="w-50 my-3 mx-5">
          <div className="d-flex" style={rightDivStyle}>
            <div
              className="w-50 border border-dark  border-3 me-2 text-center p-1"
              style={borderRound}
            >
              자산
            </div>
            <div
              className="w-50 border border-dark  border-3 ms-2 text-center p-1"
              style={borderRound}
            >
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
        <div className="btn" onClick={navigateToConsumption}>
          <div className="text-center">돈 쓰러가기(소비항목)</div>
          <div className="kiki"></div>
        </div>
        <div className="btn" onClick={navigateToBank}>
          <div className="text-center">은행으로 가기</div>
          <div className="ageo"></div>
        </div>
        <div className="btn" onClick={navigateToAuction}>
          <div className="text-center">부동산 정보 보기</div>
          <div className="lamu"></div>
        </div>
        <div className="btn" onClick={navigateToRanking}>
          <div className="text-center">통계 보기</div>
          <div className="ccoli"></div>
        </div>
      </div>
    </div>
  );
}
