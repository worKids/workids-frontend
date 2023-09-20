import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherDepositBankList(){
    const userData = useRecoilValue(userState);
    const [check, setCheck] = useState(0);
    const [bankList, setBankList] = useState([]); // 주거래 계좌 목록
    const navigate = useNavigate();

    useEffect(() => {
        const token = userData.accessToken;
        
        if (!token){
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
    const showBankList =  (
        (bankList.length === 0) 
        ?
        <div className="h-100 d-flex justify-content-center align-items-center">
            주거래 계좌를 가입한 국민이 없습니다!
        </div>
        :
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
                <div className="col-3 d-flex justify-content-center align-items-center">
                    {bank.productName}
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    {bank.balance}
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center">
                    {bank.createdDate}
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center">
                    {bank.endDate}
                </div>
            </div>
        </div>
        ))
    )

    return (
        <div>
            <div>국민 주거래 계좌 가입 내역</div>
            <div className="row m-2 text-center p-3 ">
                <div className="col-1">학급번호</div>
                <div className="col-1">이름</div>
                <div className="col-2">계좌번호</div>
                <div className="col-3">상품명</div>
                <div className="col-2">잔액(미소)</div>
                <div className="col-1">개설일</div>
                <div className="col-1">만기일</div>
            </div>
            <div className="container overflow-auto" style={{ height: "50vh" }}>
                {showBankList}
            </div>
        </div>
    );
}
