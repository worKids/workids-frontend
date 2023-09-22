import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherDepositBankList() {
  const userData = useRecoilValue(userState);
  const [check, setCheck] = useState(0);
  const [bankList, setBankList] = useState([]); // 주거래 계좌 목록
  const navigate = useNavigate();

  const divStyle = {
    borderRadius: "40px",
    backgroundColor: "#FEE173",
  };
  const midStyle = {
    height: "100%",
    borderRadius: "30px",
    backgroundColor: "#FED338",
  };

  useEffect(() => {
    const token = userData.accessToken;

    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/teacher/bank/citizen/main/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        setBankList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [check]);

  // 국민 주거래 계좌 목록 조회
  const showBankList =
    bankList.length === 0 ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        주거래 계좌를 가입한 국민이 없습니다!
      </div>
    ) : (
      bankList.map((bank, index) => (
        <div key={index}>
          <div className="row m-2 text-center p-3 ">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {bank.citizenNumber}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {bank.studentName}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.accountNumber}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productName}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.balance}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.endDate}
            </div>
          </div>
          <div className="border-top"></div> {/* 구분선 */}
        </div>
      ))
    );

  return (
    <div>
        <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
        <div className="border border-dark  border-3 p-3 fs-5" style={divStyle}>
        <div className="row m-2 text-center p-3 ">
            <div className="col-1">번호</div>
            <div className="col-1">이름</div>
            <div className="col-2">계좌번호</div>
            <div className="col-2">상품명</div>
            <div className="col-2">
            <div>잔액</div>
            </div>
            <div className="col-2">개설일</div>
            <div className="col-2">만기일</div>
        </div>
        <div
            className="container overflow-auto fs-5"
            style={{ ...divStyle, height: "42vh", maxHeight: "42vh" }}
        >
            {showBankList}
        </div>
        </div>
    </div>
  );
}
