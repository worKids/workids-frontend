import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherImmigrantAcquire({citizenNumber, name, asset, creditRating}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   


    //신용도 수정
    const handleAcquireImmigrant = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/teacher/citizen/immigrant/acquire",
            data: {
                nationNum: userData.nationNum,
                citizenNumber : citizenNumber,
                name : name,
                asset : asset,
                creditRating : creditRating,
            },
        })
        .then((response) => {
            alert("취득 신고 완료");
            handleClose();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };


    return(
        <div>
            <button onClick={handleShow}>취득신고</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>취득신고하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        정말로 수정하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleAcquireImmigrant()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}