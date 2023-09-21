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
        <div>
            <div onClick={handleShow} className="fs-5 bg-warning px-3 rounded-pill border-3 border-dark border text-center">삭제</div>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>법 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        정말로 삭제하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleDeleteLaw()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}