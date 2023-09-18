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
            <button onClick={handleShow}>삭제</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>직업 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        정말로 삭제하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleDeleteJob()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}