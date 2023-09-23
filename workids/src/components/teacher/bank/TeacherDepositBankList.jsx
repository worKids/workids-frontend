import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherDepositBankList() {
  const userData = useRecoilValue(userState);
  const [check, setCheck] = useState(0);
  const [bankList, setBankList] = useState([]); // 예금 계좌 목록
  const navigate = useNavigate();

  const hrStyle = {
    width: "100%",
    height: "5px",
    backgroundColor: "black",
    margin: "4px",
  };

  const divStyle = {
    borderRadius: "40px",
    backgroundColor: "#FEE173",
  };
  useEffect(() => {
    const token = userData.accessToken;

    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/teacher/bank/citizen/deposit/list",
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

  // 국민 예금 계좌 목록 조회
  const showBankList =
    bankList.length === 0 ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        예금 계좌를 가입한 국민이 없습니다!
      </div>
    ) : (
      bankList.map((bank, index) => {
        // 이전 행의 학급 번호와 이름
        const prevBank = index > 0 ? bankList[index - 1] : null;

        // 현재 행의 학급 번호와 이름
        const currentBank = bank;

        // 이전 행과 현재 행의 학급 번호와 이름이 같은지 확인
        const isDuplicate =
          prevBank &&
          prevBank.classNumber === currentBank.classNumber &&
          prevBank.studentName === currentBank.studentName;

        return (
          <div key={index}>
            <div className="row m-2 text-center p-3 ">
              <div className="col-1 d-flex justify-content-center align-items-center">
                {isDuplicate ? "" : bank.citizenNumber}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {isDuplicate ? "" : bank.studentName}
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                {bank.accountNumber}
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                {bank.productName}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {bank.balance}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {bank.interestRate}
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                {bank.createdDate}
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                {bank.endDate}
              </div>
            </div>
            <hr></hr>
          </div>
        );
      })
    );

  return (
    <div>
      <div
        className="border border-dark  border-3 p-3 fs-5"
        style={{ ...divStyle, height: "65vh" }}
      >
        <div className="container d-flex justify-content-end " style={{fontSize:"15px"}}>(단위:{userData.moneyName})</div>
        <div className="row m-2 text-center px-3 fs-5">
          <div className="col-1">No.</div>
          <div className="col-1">이름</div>
          <div className="col-2">계좌번호</div>
          <div className="col-2">상품명</div>
          <div className="col-1">
            <div>잔액</div>
          </div>
          <div className="col-1">
            <div>이자율</div>
          </div>
          <div className="col-2">개설일</div>
          <div className="col-2">만기일</div>
        </div>
        <div style={hrStyle}></div>
        <div
          className="container overflow-auto scrollCss fs-5"
          style={{ ...divStyle, height: "42vh", maxHeight: "42vh" }}
        >
          {showBankList}
        </div>
      </div>
    </div>
  );
}
