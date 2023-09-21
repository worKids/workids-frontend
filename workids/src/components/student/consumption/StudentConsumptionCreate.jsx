import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function StudentConsumptionCreate({consumptionNum}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //소비항목 신청
    const handleStudentConsumptionCreate = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "post",
            url: "/student/consumption",
            data: {
                consumptionNum:consumptionNum,
                nationStudentNum: userData.nationStudentNum,
            },
        })
        .then((response) => {
            alert("소비 항목 신청 완료");
            setShow(false);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    return(
        <div>
            <button onClick={handleShow}>신청</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>소비 항목 신청하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        해당 소비 항목을 신청하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleStudentConsumptionCreate()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}