import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function StudentConsumptionCreate({consumptionNum, onUpdate}){
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
            if (typeof onUpdate === "function") {
                onUpdate(); 
            }
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    return(
        <div>
            <div onClick={handleShow} className="create-button" style={{width:"10vh"}}>신청</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>소비 항목 신청하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center fs-5">
                        해당 소비 항목을 신청하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="info-label fs-5 modal-button hoverable" onClick={handleStudentConsumptionCreate}>
                        Yes
                    </div>
                    <div className="info-label fs-5 modal-button hoverable" onClick={handleClose}>
                        No
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )

}