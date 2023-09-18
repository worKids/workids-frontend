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

  const closeModal = () => {
    setShowModal(false);
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
      method: "post",
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
      method: "post",
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
          <div className="row m-2 text-center p-3 ">
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
                <div className="btn border px-4" onClick={() => endAuction(menu.auctionNum)}>
                  종료
                </div>
                <div className="btn border px-4" onClick={() => deleteAuction(menu.auctionNum)}>
                  삭제
                </div>
              </div>
            ) : menu.auctionState === 1 ? (
              <div className="col-2 btn border">
                <div onClick={() => openModal(menu.auctionNum)}>낙찰 내역 조회</div>
              </div>
            ) : menu.auctionState === 2 ? (
              <div className="col-2 btn border">
                <div>취소됨</div>
              </div>
            ) : null}
          </div>
        </div>
      ))
    ) : (
      <div className="h-100 d-flex justify-content-center align-items-center">
        경매를 생성해주세요
      </div>
    );
  return (
    <div>
      <div>
        <div className="row  m-2 text-center p-3 ">
          <div className="col-2">번호</div>
          <div className="col-6">경매 날짜</div>
          <div className="col-2">경매 상태</div>
          <div className="col-2">조회</div>
        </div>
        <div className="container overflow-auto" style={{ height: "50vh" }}>
          {auctionList}
        </div>
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
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
