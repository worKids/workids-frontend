import React, { useState } from "react";
import TeacherBankList from "./TeacherBankList";
import TeacherDepositBankList from "./TeacherDepositBankList";
import TeacherMainBankList from "./TeacherMainBankList";

export default function TeacherBank() {
  const bankMenu = ["상품 관리", "예금 계좌 가입 내역", "주거래 계좌 가입 내역"];
  const [state, setState] = useState(0);

  const clickMenu = (idx) => {
    setState(idx);
  };

  const divStyle = {
    width: "80%",
    height: "80vh",
    borderRadius: "40px",
    backgroundColor: "#FFFEEE",
  };

  const menu = bankMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => clickMenu(index)}
      className={`menu-button ${
        state === index ? "bg-warning text-white" : ""
      }`}
    >
      {menu}
    </div>
  ));

  return (
    <div style={divStyle} className="border border-dark mt-4 border-3 p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">{menu}</div>
      </div>
      {state === 0 ? (
        <div>
          <TeacherBankList />
        </div>
      ) : state === 1 ? (
        <div>
          <TeacherDepositBankList />
        </div>
      ) : (
        <div>
          <TeacherMainBankList />
        </div>
      )}
    </div>
  );
}
