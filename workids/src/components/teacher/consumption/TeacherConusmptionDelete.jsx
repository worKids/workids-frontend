import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function TeacherConsumptionDelete({consumptionNum}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //소비 항목 삭제
    const handleDeleteConsumption = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/teacher/consumption/hide",
            data: {
                consumptionNum:consumptionNum,
            },
        })
        .then((response) => {
            alert("소비 항목 삭제 완료");
            setShow(false);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    return(
        <div>
            <button onClick={handleShow}>삭제</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>소비 항목 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        정말로 삭제하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleDeleteConsumption()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}