import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function StudentBankList() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  // 판매중인 은행 상품(예금)
  const [bankInUseList, setBankInUseList] = useState([]);

  // 가입하고 싶은 은행 상품 정보
  const [productInfo, setProductInfo] = useState({
    productType: 1,
    productName: "",
    productContent: "",
    productPeriod: 0,
    interestRate: 0.0,
  });

  // 가입 신청한 은행 상품 정보
  const [productNum, setProductNum] = useState(0); // 상품 고유 번호
  const [depositAmount, setDepositAmount] = useState(""); // 예금 금액

  const [showModal, setShowModal] = useState(false); // 확인 모달창
  const [subPage, setSubPage] = useState(0); // sub 페이지

  // 모달창 제어
  const handleJoinButtonClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    // 사용자가 확인 버튼을 클릭한 경우의 처리
    createBankJoin();
    setSubPage(0); // 페이지를 다시 판매 중인 은행 상품 목록으로 이동
    setShowModal(false);
  };

  const handleCancel = () => {
    // 사용자가 취소 버튼을 클릭한 경우의 처리
    setShowModal(false);
  };

  const midStyle = {
    height: "100%",
    width: "50%",
    borderRadius: "30px",
    backgroundColor: "#FED338",
  };

  const token = userData.accessToken;

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    if (subPage == 0) {
      inUseBank();
    }
  }, [subPage]);

  // 판매중인 은행 상품 조회(예금)
  const inUseBank = () => {
    axBase(token)({
      method: "post",
      url: "/student/bank/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        setBankInUseList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  // 상품 가입하기
  const createBankJoin = () => {
    axBase(token)({
      method: "post",
      url: "/student/bank/deposit",
      data: {
        productNum: productNum,
        nationStudentNum: userData.nationStudentNum,
        depositAmount: depositAmount,
      },
    })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  // 판매중인 은행 상품
  const showInUseBankList =
    bankInUseList.length === 0 ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        판매중인 은행 상품이 없습니다!
      </div>
    ) : (
      bankInUseList.map((bank, index) => (
        <div key={index}>
          <div className="row m-2 text-center p-3 ">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {index + 1}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productType == 1 ? <div>예금</div> : null}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productName}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productPeriod}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.interestRate}
            </div>
            <div className="col-3 d-flex justify-content-center align-items-center">
              <div
                className="content-button hoverable"
                onClick={() => {
                  setProductInfo((prevState) => ({
                    ...prevState, // 이전 상태 복제
                    productType: bank.productType,
                    productName: bank.productName,
                    productContent: bank.productContent,
                    productPeriod: bank.productPeriod,
                    interestRate: bank.interestRate,
                  }));
                  setProductNum(bank.productNum);
                  setSubPage(1);
                }}
              >
                가입
              </div>
            </div>
          </div>

          <div className="text-center">{bank.productContent}</div>

          <hr />
        </div>
      ))
    );

  return subPage === 0 ? (
    <div className="fs-5">
      <div className="row m-2 text-center p-3 ">
        <div className="col-1">No.</div>
        <div className="col-2">유형</div>
        <div className="col-2">상품명</div>
        {/* <div className="col-3">상품 설명</div> */}
        <div className="col-2">상품 가입 기간(주)</div>
        <div className="col-2">만기 이자율(%)</div>
        <div className="col-3"></div>
      </div>
      <div
        className="container overflow-auto scrollCss"
        style={{ height: "54vh", backgroundColor: "#FFEFD5", borderRadius: "20px" }}
      >
        {showInUseBankList}
      </div>
    </div>
  ) : (
    <div>
      <div className="fs-5 mb-2" onClick={() => setSubPage(0)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        뒤로 가기
      </div>
      <div className="border border-dark  border-3 p-3 fs-4 text-center m-auto" style={midStyle}>
        <div className="row m-2 text-center p-3 ">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div>유형: </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            {productInfo.productType == 1 ? <div>예금</div> : null}
          </div>
        </div>
        <div className="row m-2 text-center p-3 ">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div>상품명: </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            {productInfo.productName}
          </div>
        </div>
        <div className="row m-2 text-center p-3 ">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div>만기 이자율(%): </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            {productInfo.interestRate}
          </div>
        </div>
        <div className="row m-2 text-center p-3 ">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div>상품 가입 기간(주): </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            {productInfo.productPeriod}
          </div>
        </div>
        <div className="row m-2 text-center p-3 ">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div>예금 금액: </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <input
              type="text"
              value={depositAmount}
              onChange={(e) => {
                setDepositAmount(e.target.value);
              }}
              placeholder="예금 금액 입력"
            />
          </div>
        </div>
        {/* 가입하기 버튼 */}
        <div className="content-button col-6 m-auto" onClick={handleJoinButtonClick}>
          가입하기
        </div>

        {/* 모달 */}
        <Modal show={showModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>확인창</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>상품을 가입하시겠습니까?</p>
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
  );
}
