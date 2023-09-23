import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function StudentAccountList(){
    const userData = useRecoilValue(userState);
    const navigate = useNavigate();
    // 계좌 목록 조회(주거래, 예금)
    const [bankMainList, setBankMainList] = useState([]); // 주거래 계좌 목록
    const [bankDepositList, setBankDepositList] = useState([]); // 예금 계좌 목록

    // 계좌 상세 거래내역 조회(주거래, 예금)
    const [transactionList, setTransacionList] = useState([]); // 상세 거래내역 목록
    const [transactionAccountNum, setTransactionAccountNum] = useState(0); // 계좌 상세 거래내역 조회할 계좌 정보
    const [transactionAccountNumber, setTransactionAccountNumber] = useState(""); // 계좌 상세 거래내역 조회할 계좌번호

    // 총 자산
    const [asset, setAsset] = useState(0);

    // 예금 계좌 중도 해지
    const [cancelAccountNum, setCancelAccountNum] = useState(0); // 중도 해지할 계좌 정보

    const [showModal, setShowModal] = useState(false); // 확인 모달창
    const [subPage, setSubPage] = useState(0); // sub 페이지

    // 모달창 제어
    const handleJoinButtonClick = () => {
        setShowModal(true);
    };

    const handleConfirm = () => { // 사용자가 확인 버튼을 클릭한 경우의 처리
        cancelBank();
        setShowModal(false);
        window.location.reload(); // 중도 해지 정보 업데이트하기 위해 새로고침
    };

    const handleCancel = () => { // 사용자가 취소 버튼을 클릭한 경우의 처리
        setShowModal(false);
    };

    const midStyle = {
        height: "100%",
        borderRadius: "30px",
        backgroundColor: "#FED338",
    };

    const token = userData.accessToken;

    useEffect(() => {
        if (!token){
            navigate("/");
        }
        
        if (subPage == 0){
            bankJoin();
        } else if (subPage == 1){
            detailTransaction();
        }
    }, [subPage])

    // 계좌 목록 조회(주거래, 예금)
    const bankJoin = () => {
        // 주거래 계좌
        axBase(token)({
            method: "post",
            url: "/student/bank/main/list",
            data: {
                nationStudentNum: userData.nationStudentNum,
            },
        })
        .then((response) => {
            setBankMainList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

        // 예금 계좌
        axBase(token)({
            method: "post",
            url: "/student/bank/deposit/list",
            data: {
                nationStudentNum: userData.nationStudentNum,
            },
        })
        .then((response) => {
            setBankDepositList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

        //총 자산
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
    }

    // 계좌 상세 거래내역 조회(주거래, 예금)
    const detailTransaction = () => {
        axBase(token)({
            method: "post",
            url: "/student/bank/transaction/list",
            data: {
                bankNationStudentNum: transactionAccountNum,
            },
        })
        .then((response) => {
            setTransacionList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        })
    }

    // 예금 계좌 중도 해지
    const cancelBank = () => {
        axBase(token)({
            method: "patch",
            url: "/student/bank/deposit/cancel",
            data: {
                bankNationStudentNum: cancelAccountNum,
                nationStudentNum: userData.nationStudentNum,
            },
        })
        .then((response) => {
            console.log(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        })
    }
    
    // 주거래 계좌
    const showMainBankList =  (
        (bankMainList.length === 0) 
        ?
        <div className="h-100 d-flex justify-content-center align-items-center">
            주거래 계좌가 없습니다!
        </div>
        :
        bankMainList.map((bank, index) => (
        
        <div key={index}>
            <div className="row m-2 text-center p-2 ">
                {/* <div className="col d-flex justify-content-center align-items-center">
                    {index + 1}
                </div> */}
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
                <div className="col-1 d-flex justify-content-center align-items-center">
                    <div className="btn border px-3" onClick={() => {
                        setTransactionAccountNum(bank.bankNationStudentNum);
                        setTransactionAccountNumber(bank.accountNumber);
                        setSubPage(1);
                        }}>
                        내역
                    </div>
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center">
                </div>
            </div>
        </div>
        ))
    )
    
    // 예금 계좌
    const showDepositBankList =  (
        (bankDepositList.length === 0) 
        ?
        <div className="h-100 d-flex justify-content-center align-items-center">
            예금 계좌가 없습니다!
        </div>
        :
        bankDepositList.map((bank, index) => (
        
        <div key={index}>
            <div className="row m-2 text-center p-2 ">
                {/* <div className="col d-flex justify-content-center align-items-center">
                    {index + 1}
                </div> */}
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
                <div className="col-1 d-flex justify-content-center align-items-center">
                    <div className="btn border px-3" onClick={() => {
                        setTransactionAccountNum(bank.bankNationStudentNum);
                        setTransactionAccountNumber(bank.accountNumber);
                        setSubPage(1);
                        }}>
                        내역
                    </div>
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center">
                    {/* 해지하기 버튼 */}
                    <Button variant="primary" onClick={() =>{
                        setCancelAccountNum(bank.bankNationStudentNum);
                        handleJoinButtonClick();
                        }}>
                        해지
                    </Button>

                    {/* 모달 */}
                    <Modal show={showModal} onHide={handleCancel}>
                        <Modal.Header closeButton>
                        <Modal.Title>확인창</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>중도 해지하시겠습니까?</p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={handleConfirm}>
                            확인
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
        ))
    )
    
    // 계좌 상세 거래내역
    const showTransactionList =  (
        (transactionList.length === 0) 
        ?
        <div className="h-100 d-flex justify-content-center align-items-center">
            거래내역이 없습니다!
        </div>
        :
        transactionList.map((bank, index) => (
        
        <div key={index}>
            <div className="row m-2 text-center p-2 ">
                <div className="col-2 d-flex justify-content-center align-items-center">
                    {index + 1}
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    {bank.content}
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    {bank.category}
                </div>
                {/* <div className={`col-2 d-flex justify-content-center align-items-center`}>
                    {(bank.type === 0) ? ("+" + bank.amount) : ("-" + bank.amount)}
                </div> */}
                <div className={`col-2 d-flex justify-content-center align-items-center ${bank.type === 0 ? "text-primary" : "text-danger"}`}>
                    {(bank.type === 0) ? ("+" + bank.amount) : ("-" + bank.amount)}
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    {bank.transactionDate}
                </div>
            </div>
        </div>
        ))
    )
    
    return (
        (subPage === 0)
        ?
        <div>
            <div className="row">
                <div className="col d-flex justify-content-end">
                    총 자산: {asset} {userData.moneyName}
                </div>
            </div>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={midStyle}>
                <div>
                    <div>주거래 계좌</div>
                    <div className="row m-2 text-center p-2 ">
                        {/* <div className="col">번호</div> */}
                        <div className="col-2">계좌번호</div>
                        <div className="col-2">상품명</div>
                        <div className="col-1"><div>잔액</div></div>
                        <div className="col-1"><div>이자율</div><div>(%)</div></div>
                        <div className="col-2">개설일</div>
                        <div className="col-2">만기일</div>
                        <div className="col-1"></div>
                        <div className="col-1"></div>
                    </div>
                    <div className="container overflow-auto" style={{height:"10vh", backgroundColor: '#FFEFD5', borderRadius: "20px"}}>
                        {showMainBankList}
                    </div>
                </div>
                <div>
                    <div>예금 계좌</div>
                    <div className="row m-2 text-center p-2 ">
                        {/* <div className="col">번호</div> */}
                        <div className="col-2">계좌번호</div>
                        <div className="col-2">상품명</div>
                        <div className="col-1"><div>잔액</div></div>
                        <div className="col-1"><div>이자율</div><div>(%)</div></div>
                        <div className="col-2">개설일</div>
                        <div className="col-2">만기일</div>
                        <div className="col-1"></div>
                        <div className="col-1"></div>
                    </div>
                    <div className="container overflow-auto" style={{height:"27vh", backgroundColor: '#FFEFD5', borderRadius: "20px"}}>
                        {showDepositBankList}
                    </div>
                </div>
            </div>
        </div>
        :
        <div>
            <div>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => setSubPage(0)} />뒤로 가기
            </div>
            <div className="row justify-content-start" style={{fontSize:'20px'}}>
                <div className="col">
                    {transactionAccountNumber} 계좌 거래내역
                </div>
            </div>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={midStyle}>
                <div className="row m-2 text-center p-3 ">
                    <div className="col-2">No.</div>
                    <div className="col-4">내역</div>
                    <div className="col-2">종류</div>
                    <div className="col-2">금액</div>
                    <div className="col-2">거래일</div>
                </div>
                <div className="container overflow-auto" style={{ height: "55vh", backgroundColor: '#FFEFD5', borderRadius: "20px" }}>
                    {showTransactionList}
                </div>
            </div>
        </div>
    );
}
