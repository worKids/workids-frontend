import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import TeacherBankModal from "./TeacherBankModal";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherBankList() {
  const userData = useRecoilValue(userState);
  const [showModal, setShowModal] = useState(false);
  const [bankInUseList, setBankInUseList] = useState([]); // 판매중인 은행 상품
  const [bankUnUseList, setBankUnUseList] = useState([]); // 판매종료한 은행 상품
  const [check, setCheck] = useState(0);

  const sellBankMenu = ["판매 중인 상품", "종료된 상품"];
  const [state, setState] = useState(0);

  const clickMenu = (idx) => {
    setState(idx);
  };
  // 모달창 제어
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
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
  const divStyle2 = {
    borderRadius: "40px",
    backgroundColor: "#FFFEEE",
  };

  const navigate = useNavigate();

  // 전체 은행 상품 조회
  useEffect(() => {
    const token = userData.accessToken;

    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/teacher/bank/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        // 판매중인 은행 상품, 판매종료한 은행 상품 구분
        const inUseList = response.data.data.filter((bank) => bank.productState === 0);
        const unUseList = response.data.data.filter((bank) => bank.productState === 1);

        setBankInUseList(inUseList);
        setBankUnUseList(unUseList);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [check]);

  // 은행 상품 삭제
  const deleteBank = (productNum) => {
    const token = userData.accessToken;
    axBase(token)({
      method: "patch",
      url: "/teacher/bank/hide",
      data: {
        productNum: productNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setCheck(check + 1);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  // 판매중인 은행 상품
  const showInUseBankList =
    bankInUseList.length === 0 ? (
      <div className="h-100 d-flex justify-content-center align-items-center ">
        은행 상품을 추가해보세요!
      </div>
    ) : (
      bankInUseList.map((bank, index) => (
        <div key={index}>
          <div className="row text-center">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {index + 1}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {bank.productType == 0 ? (
                <div>주거래</div>
              ) : bank.productType == 1 ? (
                <div>예금</div>
              ) : null}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productName}
            </div>
            {/* <div className="col-3 d-flex justify-content-center align-items-center">
                    {bank.productContent}
                </div> */}
            <div className="col-2 d-flex justify-content-center align-items-center">
              {index !== 0 ? bank.productPeriod : <div>나라 운영 기간</div>}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.interestRate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {index !== 0 && (
                <div className="create-button hoverable" onClick={() => deleteBank(bank.productNum)}>
                  삭제
                </div>
              )}
            </div>
          </div>
          <div className="row m-2 text-center p-2 ">
            <div className="col offset-1">{bank.productContent}</div>
          </div>
          <hr />
        </div>
      ))
    );

  // 판매종료한 은행 상품
  const showUnUseBankList =
    bankUnUseList.length === 0 ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        판매 종료한 은행 상품이 없습니다!
      </div>
    ) : (
      bankUnUseList.map((bank, index) => (
        <div key={index}>
          <div className="row text-center">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {index + 1}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {bank.productType == 0 ? (
                <div>주거래</div>
              ) : bank.productType == 1 ? (
                <div>예금</div>
              ) : null}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center fs-5">
              {bank.productName}
            </div>
            {/* <div className="col-3 d-flex justify-content-center align-items-center">
                    {bank.productContent}
                </div> */}
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productPeriod}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.interestRate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.endDate != null ? bank.endDate : null}
            </div>
          </div>
          <div className="row m-2  p-2 ">
            <div className="col offset-1 d-flex justify-content-center">{bank.productContent}</div>
          </div>
          <hr />
        </div>
      ))
    );
  const menu = sellBankMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => clickMenu(index)}
      className={`fs-5 mx-2 border border-3 border-dark rounded-pill px-3 ${
        state === index ? "bg-warning text-white hoverable" : "hoverable"
      }`}
      style={{ backgroundColor: "#FFFEEE" }}
    >
      {menu}
    </div>
  ));
  return (
    <div>
      <div className="border border-dark  border-3 p-3" style={{ ...divStyle, height: "65vh" }}>
        <div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">{menu}</div>
          </div>
          {state === 0 ? (
            <div>
              <div className="d-flex justify-content-end">
                <div
                  className="fs-5 mx-4 border border-3 border-dark rounded-pill px-3 hoverable"
                  onClick={() => openModal()}
                  style={{ backgroundColor: "#FFFEEE" }}
                >
                  상품 추가
                </div>
              </div>
              <div
                className="row m-2 text-center p-3 fs-5 border border-3 border-dark"
                style={{ ...divStyle2 }}
              >
                <div className="col-1">No.</div>
                <div className="col-1">유형</div>
                <div className="col-2">상품명</div>
                {/* <div className="col-3">상품 설명</div> */}
                <div className="col-2">상품 기간(주)</div>
                <div className="col-2">만기 이자율(%)</div>
                <div className="col-2">생성일</div>
                <div className="col-2"></div>
                <div style={hrStyle}></div>
                <div
                  className="container overflow-auto scrollCss"
                  style={{ height: "38vh", maxHeight: "38vh" }}
                >
                  {showInUseBankList}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-end">
                <div
                  className="invisible fs-5 mx-4 border border-3 border-dark rounded-pill px-3"
                  onClick={() => openModal()}
                  style={{ backgroundColor: "#FFFEEE" }}
                >
                  상품 추가
                </div>
              </div>
              <div
                className="row m-2 text-center border border-3 border-dark p-3 fs-5 "
                style={{ ...divStyle2 }}
              >
                <div className="col-1">No.</div>
                <div className="col-1">유형</div>
                <div className="col-2">상품명</div>
                {/* <div className="col-3">상품 설명</div> */}
                <div className="col-2">상품 기간(주)</div>
                <div className="col-2">만기 이자율(%)</div>
                <div className="col-2">생성일</div>
                <div className="col-2">종료일</div>
                <div style={hrStyle}></div>
                <div
                  className="container overflow-auto scrollCss"
                  style={{ height: "38vh", maxHeight: "38vh" }}
                >
                  {showUnUseBankList}
                </div>
              </div>
            </div>
          )}
        </div>
        <Modal
          show={showModal}
          onHide={closeModal}
          centered
          className="modal-lg"
          style={{ fontFamily: "KCC-Ganpan" }}
        >
          <Modal.Header>
            <Modal.Title>예금 상품 추가</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              height: "55vh",
            }}
          >
            <TeacherBankModal onModalClose={closeModal} check={check} setCheck={setCheck} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
