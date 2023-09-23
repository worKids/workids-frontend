import React from "react";
import StudentAccountList from "./StudentAccountList";
import StudentBankList from "./StudentBankList";
import { useEffect } from "react";
import { axBase } from "../../../apis/axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function StudentBank(props) {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [asset, setAsset] = useState(0);
  const divStyle = {
    width: "80%",
    borderRadius: "40px",
  };
  const heightStyle = {
    height: "90%",
    borderRadius: "40px",
  };
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/student/bank/asset",
      data: {
        nationStudentNum: userData.nationStudentNum,
      },
    })
      .then((response) => {
        setAsset(response.data.data.asset);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  });
  return (
    <div
      className="border border-dark  border-3 p-3 h-100"
      style={{ ...divStyle, backgroundColor: "#ffc107" }}
    >
      {props.state === 0 ? (
        <div className="h-100">
          <div className="container d-flex justify-content-between">
            <div className="mx-3 my-2 fs-3">내 계좌 조회하기</div>
            <div>
              <div className="fs-5">
                총 자산: {asset} {userData.moneyName}
              </div>
              <div className="text-center">(단위:{userData.moneyName})</div>
            </div>
          </div>
          <div
            className="border border-dark  border-3 p-3"
            style={{ ...heightStyle, backgroundColor: "#FFFEEE" }}
          >
            <StudentAccountList />
          </div>
        </div>
      ) : (
        <div className="h-100">
          <div className="container d-flex justify-content-between">
            <div className="mx-3 my-2 fs-3">상품 가입하기</div>
            <div>
              <div className="fs-5">
                총 자산: {asset} {userData.moneyName}
              </div>
              <div className="text-center">(단위:{userData.moneyName})</div>
            </div>
          </div>
          <div
            className="border border-dark  border-3 p-4"
            style={{ ...heightStyle, backgroundColor: "#FFFEEE" }}
          >
            <StudentBankList />
          </div>
        </div>
      )}
    </div>
  );
}
