import React from "react";
import { useState } from "react";
export default function StudentTopNav() {
  const [studentName, setStudentName] = useState("ooo");
  const [nationName, setNationName] = useState("삼다수나라");
  const divStyle = {
    height: "13%",
  };
  return (
    <div style={divStyle} className="fs-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="m-3">로고 칸</div>
          <div className="m-3">{nationName}</div>
          <div className="m-3">{studentName}</div>
        </div>
        <div className="m-3">마이페이지</div>
      </div>
      <div className="mx-3"></div>
    </div>
  );
}
