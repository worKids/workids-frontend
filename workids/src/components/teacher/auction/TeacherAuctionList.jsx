import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./auction.css";
import TeacherAuctionModal from "./TeacherAuctionModal";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
export default function TeacherAuctionList() {
  const userData = useRecoilValue(userState);
  const [showModal, setShowModal] = useState(false);
  const [aucList, setAucList] = useState([]);
  const [auctionNum, setAuctionNum] = useState("");
  const [check, setCheck] = useState(0);
  const openModal = (num) => {
    setAuctionNum(num);
    setShowModal(true);
  };
  const divStyle = {
    borderRadius: "40px",
    backgroundColor: "#FEE173",
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const hrStyle = {
    width: "99%",
    height: "5px",
    backgroundColor: "black",
    margin: "4px",
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/auction/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setAucList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [check]);

  const endAuction = (num) => {
    const token = userData.accessToken;
    axBase(token)({
      method: "patch",
      url: "/teacher/auction/done",
      data: {
        auctionNum: num,
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

  const deleteAuction = (num) => {
    const token = userData.accessToken;
    axBase(token)({
      method: "patch",
      url: "/teacher/auction/hide",
      data: {
        auctionNum: num,
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

  const auctionList =
    aucList !== null ? (
      aucList.map((menu, index) => (
        <div key={index}>
          <div className="row my-3 text-center px-3">
            <div className="col-2 d-flex justify-content-center align-items-center">
              {index + 1}
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center">
              {menu.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.auctionState === 0 ? (
                <div>진행 중</div>
              ) : menu.auctionState === 1 ? (
                <div>경매 종료</div>
              ) : menu.auctionState === 2 ? (
                <div>취소됨</div>
              ) : null}
            </div>
            {menu.auctionState === 0 ? (
              <div className="col-2 d-flex justify-content-between">
                <div
                  className="btn bg-white border-3 border-dark border px-3"
                  onClick={() => endAuction(menu.auctionNum)}
                >
                  종료
                </div>
                <div
                  className="btn bg-white border-3 border-dark border px-3"
                  onClick={() => deleteAuction(menu.auctionNum)}
                >
                  삭제
                </div>
              </div>
            ) : menu.auctionState === 1 ? (
              <div className="col-2 btn bg-white border-3 border-dark border">
                <div onClick={() => openModal(menu.auctionNum)}>낙찰 내역 조회</div>
              </div>
            ) : menu.auctionState === 2 ? (
              <div className="col-2 btn bg-white border-3 border-dark border">
                <div>취소됨</div>
              </div>
            ) : null}
          </div>
          <hr></hr>
        </div>
      ))
    ) : (
      <div className="h-100 d-flex justify-content-center align-items-center">
        경매를 생성해주세요
      </div>
    );
  return (
    <div className="fs-5 border border-3 border-dark" style={{ ...divStyle, height: "65vh" }}>
      <div className="row  m-2 text-center p-3 fs-5">
        <div className="col-2">No.</div>
        <div className="col-6">경매 날짜</div>
        <div className="col-2">경매 상태</div>
        <div className="col-2">조회</div>
      </div>
      <div className="me-5" style={hrStyle}></div>
      {/* <hr style={{borderTop: "3px solid #000000"}} /> */}
      <div className="container overflow-auto  scrollCss" style={{ ...divStyle, height: "48vh" }}>
        {auctionList}
      </div>

      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        className="modal-lg"
        style={{ fontFamily: "KCC-Ganpan" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>낙찰 내역 조회</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: "55vh",
          }}
        >
          <TeacherAuctionModal state={auctionNum} />
        </Modal.Body>
        <Modal.Footer>
          <div className="info-label fs-5 modal-button hoverable" onClick={closeModal}>
              닫기
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
