import React from "react";
import StudentJobList from "./StudentJobList";
import StudentMyJobList from "./StudentMyJobList";

export default function StudentAuction(props) {
  const divStyle = {
    width: "80%",
    borderRadius: "40px",
  };
  const heightStyle = {
    height: "100%",
    borderRadius: "40px",
  };

  return (
    <div className="border border-dark  border-3 p-3 h-100" style={divStyle}>

      {props.state === 0 ? (

        <div className="h-100">
          <div>전체 직업 조회하기</div>
          <div className="border border-dark border-3 p-3" style={{ width: '100%', height: '85%', borderRadius: '10px', marginTop: '50px', backgroundColor: "rgba(254, 211, 56, 0.8)", }}>
            <StudentJobList />
          </div>
        </div>
      ) : (
        <div className="h-100">
          <div>내 직업 조회하기</div>
          <div className="border border-dark border-3 p-3" style={{ width: '100%', height: '85%', borderRadius: '10px', marginTop: '50px', backgroundColor: "rgba(254, 211, 56, 0.8)", }}>
            <StudentMyJobList />
          </div>
        </div>
      )}
    </div>
  );
}
