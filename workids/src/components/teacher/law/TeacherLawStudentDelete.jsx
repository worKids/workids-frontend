import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function TeacherLawStudentDelete({tabType,lawNationStudentNum}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //학생-벌금 부여 취소
    const handleDeleteFineStudent = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        
        axBase(token)({
            method: "post",
            url: "/teacher/law/fine/cancel",
            data: {
                lawNationStudentNum:lawNationStudentNum,
            },
        })
        .then((response) => {
            alert("벌금 부여 취소 완료");
            setShow(false)
            window.location.reload();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    //학생-벌칙 부여 취소
    const handleDeletePenaltyStudent = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        
        axBase(token)({
            method: "delete",
            url: "/teacher/law/penalty",
            data: {
                lawNationStudentNum:lawNationStudentNum,
            },
        })
        .then((response) => {
            alert("벌칙 부여 취소 완료");
            setShow(false)
            window.location.reload();
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
                    <Modal.Title>법 부여 취소하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        정말로 취소하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {tabType ===0 ?(
                        <button onClick={() => handleDeleteFineStudent()}>Yes</button>
                    ): (
                        <button onClick={() => handleDeletePenaltyStudent()}>Yes</button>
                    )}
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}