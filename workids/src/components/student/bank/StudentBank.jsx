import React from "react";
import StudentAccountList from "./StudentAccountList";
import StudentBankList from "./StudentBankList";

export default function StudentBank(props) {
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
            <StudentAccountList />
        </div>
      ) : (
        <div className="h-100">
            <StudentBankList />
        </div>
      )}
    </div>
  );
}
