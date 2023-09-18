import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function TeacherConsumptionProcess({consumptionNationStudentNum, state}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [updateState, setUpdateState] = useState(state);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeState = (e) => {
        if (e.target.id === 'inline-radio-1') {
            setUpdateState(1); 
        } else if (e.target.id === 'inline-radio-2') {
            setUpdateState(2);
        }
    };

    //미결재건 처리
    const handleConsumptionProcess = () => {
        
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        // 벌금-학생 항목 리스트 뽑아오기
        axBase(token)({
            method: "post",
            url: "/teacher/consumption/citizen/outstanding/process",
            data: {
                consumptionNationStudentNum: consumptionNationStudentNum,
                state: updateState,
            },
        })
        .then((response) => {
            alert("처리 완료");
            setShow(false)
            window.location.reload();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    return(
        <div>
            <button style={{width:'40px', height:'25px', fontSize:'13px'}} onClick={handleShow}>처리</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>미결재건 처리하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-center">
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="승인"
                                    name="type"
                                    value={updateState}
                                    type={type}
                                    id={`inline-${type}-1`}
                                    onChange={onChangeState}
                                />
                            </div>
                        ))}

                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="거절"
                                    name="type"
                                    value={updateState}
                                    type={type}
                                    id={`inline-${type}-2`}
                                    onChange={onChangeState}
                                />
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleConsumptionProcess()}>확인</button>
                    <button onClick={handleClose}>취소</button>
                </Modal.Footer>
            </Modal>    
        </div>
    );

}