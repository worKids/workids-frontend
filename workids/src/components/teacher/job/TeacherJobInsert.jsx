import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherJobUpdate({ citizenNumber, name, onUpdate }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //직업부여 수정
  const handleInsertJob = () => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "teacher/job/citizen/join",
      data: {
        nationNum: userData.nationNum,
        citizenNumber: citizenNumber,
        name: name,
        state: 0,
      },
    })
      .then((response) => {
        alert("직업 수정 완료");
        handleClose();
        if (typeof onUpdate === "function") {
          onUpdate(); 
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <button onClick={handleShow} className="create-button">
        등록
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title class="info-label">직업 등록하기</Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-label fs-5 text-center">
          <div>정말로 등록하시겠습니까?</div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => handleInsertJob()} className="info-label fs-5 modal-button">
            Yes
          </button>
          <button onClick={handleClose} className="info-label fs-5 modal-button">
            No
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
