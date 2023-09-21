import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function TeacherLawDelete({lawNum}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //법 삭제
    const handleDeleteLaw = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/teacher/law/hide",
            data: {
                lawNum:lawNum,
            },
        })
        .then((response) => {
            alert("법 삭제 완료");
            setShow(false);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };


    return(
        <div >
            <div onClick={handleShow} className="content-button">삭제</div>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title className="info-label fs-3">법 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="info-label fs-5 text-center">
                        정말로 삭제하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div onClick={handleDeleteLaw} className="info-label fs-5 modal-button">Yes</div>
                    <div onClick={handleClose} className="info-label fs-5 modal-button">No</div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}