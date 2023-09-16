import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";


export default function TeacherLawCreate(){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [selectedTab, setSelectedTab] = useState('tab1'); // 초기 선택된 탭
    const [addLaw, setAddLaw] = useState({
        nationNum : userData.nationNum,
        content: "",
        type: 0,
        fine: 0,
        penalty: "",
      });
    const {nationNum, content, type, fine, penalty} = addLaw;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAllInput = (e) =>{
        const {name, value} = e.target;
        const nextInputs = {
            ...addLaw,
            [name] : value,
        };

        //객체를 새로운 상태로 쓰겠다. 
        setAddLaw(nextInputs);
    }

    const onResetFine = () => {
        setAddLaw({
          nationNum: userData.nationNum, 
          content: "",
          type: 0,
          fine: 0,
          penalty: "",
        })
      };

    const onResetPenalty = () => {
        setAddLaw({
          nationNum: userData.nationNum,  
          content: "",
          type: 1,
          fine: 0,
          penalty: "",
        })
      };

    const handleTabChange = (e) => {
        if (e.target.id === 'inline-radio-1') {
        setSelectedTab('tab1'); // 1번이 선택되면 tab1 표시
        onResetFine();
        } else if (e.target.id === 'inline-radio-2') {
        setSelectedTab('tab2'); // 2번이 선택되면 tab2 표시
        onResetPenalty();
        }
    };

    const handleAddLaw = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        // 벌금-학생 항목 리스트 뽑아오기
        axBase(token)({
            method: "post",
            url: "/teacher/law",
            data: {
                nationNum: addLaw.nationNum,
                content: addLaw.content,
                type: addLaw.type,
                fine: addLaw.fine,
                penalty: addLaw.penalty,
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
            <button onClick={handleShow}>추가</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>법 제정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="벌금 법 제정"
                                name="type"
                                type={type}
                                id={`inline-${type}-1`}
                                checked={selectedTab === 'tab1'}
                                onChange={handleTabChange}
                            />
                            <Form.Check
                                inline
                                label="벌칙 법 제정"
                                name="type"
                                type={type}
                                id={`inline-${type}-2`}
                                checked={selectedTab === 'tab2'}
                                onChange={handleTabChange}
                            />
                            </div>
                        ))}
                        {selectedTab === 'tab1' && (
                            <div>
                                벌금 항목 추가
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        부과 규칙 : 
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="text" name="content" placeholder="부과 규칙" onChange={getAllInput} value={content}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        벌금: 
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control type="text" name="fine" placeholder="벌금 금액" onChange={getAllInput} value={fine}/>
                                    </Col>
                                    <Col sm="3">미소</Col>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button className="btn_close" variant="secondary" onClick={handleAddLaw}>
                                        제정
                                    </Button>
                                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                                        닫기
                                    </Button>
                                </Modal.Footer>
                            </div>
                        )}
                        {selectedTab === 'tab2' && (
                            <div>
                                벌칙 항목 추가
                                <Form.Group as={Row} className="mb-3" controlId="content">
                                    <Form.Label column sm="3">
                                        부과 규칙 : 
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="text" name="content" placeholder="부과 규칙" onChange={getAllInput} value={content}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="fine">
                                    <Form.Label column sm="3">
                                        벌칙: 
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="text" name="penalty" onChange={getAllInput} value={penalty} placeholder="벌칙 내용"/>
                                    </Col>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button className="btn_close" variant="secondary" onClick={handleAddLaw}>
                                        제정
                                    </Button>
                                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                                        닫기
                                    </Button>
                                </Modal.Footer>
                            </div>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}