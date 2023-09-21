import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function StudentConsumptionDelete({consumptionNationStudentNum}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //신청 내역 취소
    const handleStudentConsumptionDelete = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/student/consumption/cancel",
            data: {
                consumptionNationStudentNum:consumptionNationStudentNum,
            },
        })
        .then((response) => {
            alert("신청 내역 취소 완료");
            setShow(false);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    return(
        <div>
            <button onClick={handleShow}>취소</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>신청 내역 취소하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        해당 소비 내역 신청을 취소하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleStudentConsumptionDelete()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}