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
            <div onClick={handleShow} className="content-button">수정</div>

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
                                <Form.Control type="number" onChange={onChangeFine} value={updateFine} placeholder="벌금 금액" />
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