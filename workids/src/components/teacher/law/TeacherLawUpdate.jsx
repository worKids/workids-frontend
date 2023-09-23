import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";


export default function TeacherLawUpdate({lawNum, content, fine, onUpdate}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [updateFine, setUpdateFine] = useState(fine);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setUpdateFine(fine);
    }

    const onChangeFine = (e) => {
        setUpdateFine(e.target.value);
    };


    //법 수정
    const handleUpdateLaw = () => {
        if(updateFine== fine){
            alert("지정된 벌금과 같으므로 수정할 수 없습니다.");
        } else{
            const token = userData.accessToken;
            if (!token) {
                navigate("/");
            }
        
            // 벌금-학생 항목 리스트 뽑아오기
            axBase(token)({
                method: "patch",
                url: "/teacher/law",
                data: {
                    nationNum: userData.nationNum,
                    content: content,
                    fine: updateFine,
                    lawNum: lawNum,
                    type: 0,
                },
            })
            .then((response) => {
                alert("법 수정 완료");
                setShow(false);
                if (typeof onUpdate === "function") {
                    onUpdate(); // 부모 컴포넌트로 알림
                }
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
        }
    };
    
    
    return(
        <div>
            <div onClick={handleShow} className="create-button hoverable px-1">수정</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title className="fs-4">법 벌금 수정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="px-3">
                        <Form.Group as={Row} className="mb-2 fs-5 p-1">
                            <Row className="p-1">
                                <Col sm="3">
                                    부과규칙 : 
                                </Col>
                                <Col sm="5">
                                    {content}
                                </Col>
                            </Row>    
                            <Row className="p-1">
                                <Col sm="3">
                                    벌금 : 
                                </Col>
                                <Col sm="5">
                                    <Form.Control type="number" onChange={onChangeFine} value={updateFine} placeholder="벌금 금액" />
                                </Col>
                                <Col sm="3">{userData.moneyName}</Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div onClick={handleUpdateLaw} className="fs-5 modal-button hoverable">수정</div>
                    <div onClick={handleClose} className="fs-5 modal-button hoverable">취소</div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}