import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";


export default function TeacherLawUpdate({lawNum, content}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeFine = () => {
        setFine(e.target.value);
    };

    const onReset = () => {
        setFine({})
    }

    //법 수정
    const handleUpdateLaw = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        // 벌금-학생 항목 리스트 뽑아오기
        axBase(token)({
            method: "patch",
            url: "/teacher/law",
            data: {
                lawNum: lawNum,
                content: content,
                type: 0,
            },
        })
        .then((response) => {
            alert("법 등록 완료");
            handleClose();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };
    
    
    return(
        <div>
            <button onClick={handleShow}>수정</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>법 벌금 수정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <div>부과규칙 : {content}</div>
                            <Form.Label column sm="2">
                                벌금 : 
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="fine" placeholder="벌금 금액" />
                            </Col>
                            <Col sm="3">미소</Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleUpdateLaw()}>수정</button>
                    <button onClick={handleClose}>취소</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}