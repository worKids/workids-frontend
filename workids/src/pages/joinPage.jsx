import React, { useState } from "react";
import TeacherJoin from "../components/teacher/TeacherJoin";
import StudentJoin from "../components/student/StudentJoin";

export default function joinPage() {
  const [typeState, setTypeState] = useState(0);

  const borderRound = {
    borderRadius: "40px",
  };
  const joinSize = {
    height: "95%",
  };
  const userType = ["선생님", "학생"];

  const isActive = (index) => {
    if (typeState === index) {
      return true;
    }
    return false;
  };
  const userMap = userType.map((data, index) => (
    <div
      key={index}
      onClick={() => setTypeState(index)}
      style={{ width: "45%"}}
      className={`m-auto border border-dark border-3 mt-3 text-center rounded-pill px-5 py-1 ${
        isActive(index) ? "bg-warning text-white" : ""
      }`}
    >
      {data}
    </div>
  ));
  return (
    <div className="m-auto row d-flex justify-content-center" style={joinSize}>
      <div className="col-6 mt-5 border border-dark border-3" style={borderRound}>
        <h3 className="d-flex justify-content-center mt-3">회원가입</h3>
        <div className="d-flex justify-content-around m-3">{userMap}</div>
        {typeState === 0 ? <TeacherJoin /> : <StudentJoin />}
      </div>
    </div>
  );
}
