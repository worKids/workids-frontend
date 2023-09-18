import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherJobUpdate({citizenNumber, name}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   


    //직업부여 수정
    const handleUpdateJob = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/teacher/job/citizen",
            data: {
                nationNum: userData.nationNum,
                citizenNumber : citizenNumber,
                name : name,
            },
        })
        .then((response) => {
            alert("직업 수정 완료");
            handleClose();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };


    return(
        <div>
            <button onClick={handleShow}>수정</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>직업 수정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        정말로 수정하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleUpdateJob()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}