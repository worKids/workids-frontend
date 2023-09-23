import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function TeacherConsumptionDelete({consumptionNum, onUpdate}){
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
            if (typeof onUpdate === "function") {
                onUpdate(); // 부모 컴포넌트로 알림
            }
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    return(
        <div>
            <div onClick={handleShow} className="create-button px-1 hoverable">삭제</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title className="info-label fs-4">소비 항목 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="info-label fs-5 text-center">
                        정말로 삭제하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div onClick={handleDeleteConsumption} className="info-label fs-5 modal-button hoverable">Yes</div>
                    <div onClick={handleClose} className="info-label fs-5 modal-button hoverable">No</div>
                </Modal.Footer>
            </Modal>
        </div>
    )

}