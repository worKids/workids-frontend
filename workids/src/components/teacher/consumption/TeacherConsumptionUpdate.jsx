import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TeacherConsumptionUpdate({consumptionNum, content, amount}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [updateAmount, setUpdateAmount] = useState(amount);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeAmount = (e) => {
        setUpdateAmount(e.target.value);
    };

    //소비 금액 수정
    const handleUpdateLaw = () => {
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
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
        }
    };

    return(
        <div>
            <button onClick={handleShow}>수정</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>소비 금액 수정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <div>소비 항목 : {content}</div>
                            <Form.Label column sm="2">
                                금액 : 
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" onChange={onChangeAmount} value={updateAmount} placeholder="소비 금액" />
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