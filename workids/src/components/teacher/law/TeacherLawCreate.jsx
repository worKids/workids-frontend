import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";


export default function TeacherLawCreate({onUpdate}){
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('tab1'); // 초기 선택된 탭
    const [addLaw, setAddLaw] = useState({
        nationNum : userData.nationNum,
        content: "",
        type: 0,
        fine: null,
        penalty: "",
      });
    const {nationNum, content, type, fine, penalty} = addLaw;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        onResetFine();
        setSelectedTab('tab1');
    }

    const getAllInput = (e) =>{
        const {name, value} = e.target;
        const nextInputs = {
            ...addLaw,
            [name] : value,
        };

        //객체를 새로운 상태로 쓰겠다. 
        setAddLaw(nextInputs);
        console.log(addLaw);
    }

    //tab 누를때 입력된 내용 reset
    const onResetFine = () => {
        setAddLaw({
          nationNum: userData.nationNum, 
          content: "",
          type: 0,
          fine: null,
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
        if((addLaw.content=="" || addLaw.fine==null || addLaw.fine==0) &&  (addLaw.content=="" || addLaw.penalty=="")){
            alert("빈칸을 모두 채워주세요. (벌금은 0이 될 수 없습니다.)");
        }else{
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
            <div onClick={handleShow} className="create-button">추가</div>

            <Modal show={show} onHide={handleClose}
            style={{ fontFamily: "KCC-Ganpan" }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>법 제정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="text-center">
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
                            <div className="fs-5">
                                <Form.Group as={Row} className="mb-2 px-2">
                                    <Form.Label column sm="3">
                                        부과 규칙 : 
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="text" name="content" placeholder="부과 규칙" onChange={getAllInput} value={content}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-2 px-2">
                                    <Form.Label column sm="3">
                                        벌금: 
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control type="number" name="fine" placeholder="벌금 금액" onChange={getAllInput} value={fine || ''}/>
                                    </Col>
                                    <Col sm="3">{userData.moneyName}</Col>
                                </Form.Group>
                                <Modal.Footer>
                                    <div className="info-label fs-5 modal-button" onClick={handleAddLaw}>
                                        제정
                                    </div>
                                    <div className="info-label fs-5 modal-button" onClick={handleClose}>
                                        닫기
                                    </div>
                                </Modal.Footer>
                            </div>
                        )}
                        {selectedTab === 'tab2' && (
                            <div className="fs-5">
                                <Form.Group as={Row} className="mb-2 px-2">
                                    <Form.Label column sm="3">
                                        부과 규칙 : 
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="text" name="content" placeholder="부과 규칙" onChange={getAllInput} value={content}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-2 px-2">
                                    <Form.Label column sm="3">
                                        벌칙: 
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="text" name="penalty" onChange={getAllInput} value={penalty} placeholder="벌칙 내용"/>
                                    </Col>
                                </Form.Group>
                                <Modal.Footer>
                                    <div className="info-label fs-5 modal-button" onClick={handleAddLaw}>
                                        제정
                                    </div>
                                    <div className="info-label fs-5 modal-button" onClick={handleClose}>
                                        닫기
                                    </div>
                                </Modal.Footer>
                            </div>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}