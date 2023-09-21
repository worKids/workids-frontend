import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherCreditRatingUpdate({citizenNumber, creditRating}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   


    //신용도 수정
    const handleUpdateCreditRating = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/teacher/citizen/credit",
            data: {
                nationNum: userData.nationNum,
                citizenNumber : citizenNumber,
                creditRating : creditRating,
            },
        })
        .then((response) => {
            alert("신용도 수정 완료");
            handleClose();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };


    return(
        <div>
            <button onClick={handleShow} className="content-button">수정</button>

            <Modal show={show} onHide={handleClose}
           
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title class = "info-label">신용도 수정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body className="info-label fs-5 text-center">
                    <div>
                        정말로 수정하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleUpdateCreditRating()} className="info-label fs-5 modal-button">Yes</button>
                    <button onClick={handleClose} className="info-label fs-5 modal-button">No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}