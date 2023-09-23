import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function TeacherLawDelete({lawNum, onUpdate}){
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
            if (typeof onUpdate === "function") {
                onUpdate(); 
            }
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };


    return(
        <div >
            <div onClick={handleShow} className="create-button hoverable px-1">삭제</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title className="fs-4">법 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="fs-5 text-center">
                        정말로 삭제하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div onClick={handleDeleteLaw} className="info-label fs-5 modal-button hoverable">Yes</div>
                    <div onClick={handleClose} className="info-label fs-5 modal-button hoverable">No</div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}