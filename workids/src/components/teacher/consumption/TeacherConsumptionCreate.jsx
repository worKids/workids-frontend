import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function TeacherConsumptionCreate({onUpdate}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();
    const [addConsumption, setAddConsumption] = useState({
        content: "",
        amount: null,
    });
    const {content,amount} = addConsumption;

    const handleClose = () => setShow(false);
    const handleShow = () => {onReset(); setShow(true);}

    //input 받아오기
    const getAllInput = (e) =>{
        const {name, value} = e.target;
        const nextInputs = {
            ...addConsumption,
            [name] : value,
        };

        setAddConsumption(nextInputs);
    }

    const onReset = () => {
        setAddConsumption({
            content: "",
            amount: null,
        })
    };

    const handleAddConsumption = () => {
        //content, amount 빈칸이면 alert창 띄우기
        if(addConsumption.content=="" || addConsumption.amount==null || addConsumption.amount==0){
            alert("항목 추가 내용을 모두 적어주세요.(금액은 0이 될 수 없습니다.)");
        } else{
            const token = userData.accessToken;
            if (!token) {
                navigate("/");
            }
        
            // 벌금-학생 항목 리스트 뽑아오기
            axBase(token)({
                method: "post",
                url: "/teacher/consumption",
                data: {
                    nationNum: userData.nationNum,
                    content: addConsumption.content,
                    amount: addConsumption.amount,
                },
            })
            .then((response) => {
                alert("소비 항목 등록 완료");
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
            <div onClick={handleShow} className="content-button hoverable px-3">추가</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>소비 항목 추가하기</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <div>
                            <Form.Group as={Row} className="mb-2 fs-5 px-2">
                                <Form.Label column sm="3">
                                    소비 항목 :
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" name="content" placeholder="소비 항목" onChange={getAllInput} value={content}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3 fs-5 px-2">
                                <Form.Label column sm="3">
                                    금액 : 
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control type="number" name="amount" placeholder="금액" onChange={getAllInput} value={amount || ''}/>
                                </Col>
                                <Col sm="3">{userData.moneyName}</Col>
                            </Form.Group>
                            <Modal.Footer>
                                <div className="info-label fs-5 modal-button hoverable" onClick={handleAddConsumption}>
                                    추가
                                </div>
                                <div className="info-label fs-5 modal-button hoverable" onClick={handleClose}>
                                    닫기
                                </div>
                            </Modal.Footer>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}