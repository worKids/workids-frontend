import React, { useState } from "react";
import TeacherBankList from "./TeacherBankList";

export default function TeacherBank(){
    const bankMenu = ["상품 관리", "예금 계좌 가입 조회", "주거래 계좌 가입 조회"];
    const [state, setState] = useState(0);

    const clickMenu = (idx) => {
        setState(idx);
    };

    const divStyle = {
        width: "80%",
        borderRadius: "40px",
    };

    const menu = bankMenu.map((menu, index) => (
        <div
          key={index}
          onClick={() => clickMenu(index)}
          className={`m-2 border border-dark  border-3 text-center p-3 rounded-pill ${
            state === index ? "bg-warning text-white" : ""
          }`}
        >
          {menu}
        </div>
    ));

    return (
    <div style={divStyle} className="border border-dark  border-3 p-3">
        <div className="d-flex justify-content-between">
        <div className="d-flex">{menu}</div>
        <div>은행 관리</div>
        </div>
        {state === 0 ? (
            <div>
                <TeacherBankList />
            </div>
        ) : (
            <div>
                <h1>{state}</h1>
            </div>
        )}
    </div>
    );
}
