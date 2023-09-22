import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TeacherConsumptionUpdate({consumptionNum, content, amount, onUpdate}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [updateAmount, setUpdateAmount] = useState(amount);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {setUpdateAmount(amount); setShow(true);}

    const onChangeAmount = (e) => {
        setUpdateAmount(e.target.value);
    };

    //소비 금액 수정
    const handleUpdateConsumption = () => {
        if(updateAmount== amount){
            alert("지정된 금액과 같으므로 수정할 수 없습니다.");
        } else{
            const token = userData.accessToken;
            if (!token) {
                navigate("/");
            }
        
            // 벌금-학생 항목 리스트 뽑아오기
            axBase(token)({
                method: "patch",
                url: "/teacher/consumption",
                data: {
                    nationNum: userData.nationNum,
                    content: content,
                    amount: updateAmount,
                    consumptionNum: consumptionNum,
                },
            })
            .then((response) => {
                alert("소비 금액 수정 완료");
                setShow(false);
                if (typeof onUpdate === "function") {
                    onUpdate(); 
                }
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
        }
    };

    return(
        <div>
            <div onClick={handleShow} className="content-button">수정</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title className="fs-4">소비 금액 수정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="px-3">
                        <Form.Group as={Row} className="mb-3 fs-5 p-1">
                            <Row className="p-1">
                                <Col sm="3">
                                    금액 : 
                                </Col>
                                <Col sm="5">
                                    <Form.Control type="number" onChange={onChangeAmount} value={updateAmount} placeholder="소비 금액" />
                                </Col>
                                <Col sm="3">{userData.moneyName}</Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div onClick={handleUpdateConsumption} className="info-label fs-5 modal-button">수정</div>
                    <div onClick={handleClose} className="info-label fs-5 modal-button">취소</div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}