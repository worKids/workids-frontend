import React, { useEffect, useState } from "react";
import '../../../App.css';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function TeacherLawStudentCreate({tabType, citizenNumber, lawNum, onUpdate}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(lawNum==0){
            alert("부여할 법을 선택해주세요.");
        }else if(citizenNumber==null){
            alert("학급 번호를 입력해주세요.");
        }else{
            setShow(true)
        }
    };

    //벌금-학생 부여
    const handleCreateFineStudent = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        // 벌금-학생 항목 리스트 뽑아오기
        axBase(token)({
            method: "post",
            url: "/teacher/law/fine",
            data: {
                citizenNumber: citizenNumber,
                lawNum: lawNum,
            },
        })
        .then((response) => {
            alert("벌금 부여 완료");
            setShow(false);
            if (typeof onUpdate === "function") {
                onUpdate(); 
            }
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    //벌칙-학생 부여
    const handleCreatePenaltyStudent = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        // 벌금-학생 항목 리스트 뽑아오기
        axBase(token)({
            method: "post",
            url: "/teacher/law/penalty",
            data: {
                citizenNumber: citizenNumber,
                lawNum: lawNum,
            },
        })
        .then((response) => {
            alert("벌칙 부여 완료");
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
            <div onClick={handleShow} className="content-button px-3 " >부여</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title className="fs-4">학생에게 법 부여하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="info-label fs-5 text-center">
                        법을 부여하시겠습니까?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {tabType ===0 ?(
                        <div onClick={() => handleCreateFineStudent()} className="info-label fs-5 modal-button hoverable">Yes</div>
                    ): (
                        <div onClick={() => handleCreatePenaltyStudent()} className="info-label fs-5 modal-button hoverable">Yes</div>
                    )}
                    <div onClick={handleClose} className="info-label fs-5 modal-button hoverable">No</div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

