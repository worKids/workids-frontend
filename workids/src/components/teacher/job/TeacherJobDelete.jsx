import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function TeacherJobDelete({name}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   


    //직업 삭제
    const handleDeleteJob = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "patch",
            url: "/teacher/job/citizen/hide",
            data: {
                nationNum: userData.nationNum,
                name:name,
            },
        })
        .then((response) => {
            alert("직업 삭제 완료");
            handleClose();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };


    return(
        <div>
           <div onClick={handleShow}  className="content-button">삭제</div>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title className="info-label fs-3">직업 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <div className="info-label fs-5 text-center">
                        정말로 삭제하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <div onClick={handleDeleteJob} className="info-label fs-5 modal-button">Yes</div>
                    <div onClick={handleClose} className="info-label fs-5 modal-button">No</div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}