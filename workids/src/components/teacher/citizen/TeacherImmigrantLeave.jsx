import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherImmigrantLeave({citizenNumber}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   


    //국적 이탈
    const handleLeaveImmigrant = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/teacher/citizen/immigrant/leave",
            data: {
                nationNum: userData.nationNum,
                citizenNumber : citizenNumber,
            },
        })
        .then((response) => {
            alert("완료");
            handleClose();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };


    return(
        <div>
            <button onClick={handleShow}>이탈신고</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>국적 이탈하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        정말로 수정하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleLeaveImmigrant()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}