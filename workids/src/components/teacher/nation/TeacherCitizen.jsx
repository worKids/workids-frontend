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

export default function StudentConsumptionCreate({consumptionNum}){
    const nationInfoMenu = ["나라 정보", "나라 정보 수정", "학급번호 연결"];
    const [state, setState] = useState(0);//버튼 클릭 
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const navigate = useNavigate();
    const [citizenInfo, setCitizenInfo] = useState({
        nationNum:"",
        name: "",
        citizenNumber:"",
        birthData: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

       
    const clickMenu = (idx) => {
        setState(idx);
        onReset();
        if(idx===1){
            setCheckedItems(initialCheckedItems); //checkbox 초기 설정
        }
      };

    const divStyle = {
    width: "80%",
    borderRadius: "40px",
    };

    const borderRound = {
        borderRadius: "40px",
        textAlign: 'center',
    };

    const menu = nationInfoMenu.map((menu, index) => (
        <div
          key={index}
          onClick={() => clickMenu(index)}
          className={`m-2 border border-dark  border-3 text-center p-3 rounded-pill ${
            state === index ? "bg-warning text-white" : ""
          }`}
        >
          {menu}
        </div>
    ));
    //소비항목 신청
    const handleStudentConsumptionCreate = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
    
        axBase(token)({
            method: "post",
            url: "/student/consumption",
            data: {
                consumptionNum:consumptionNum,
                nationStudentNum: userData.nationStudentNum,
            },
        })
        .then((response) => {
            alert("소비 항목 신청 완료");
            setShow(false)
            window.location.reload();
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    };

    //input 받아오기
    const getAllInput = (e) =>{
        const {name, value} = e.target;
        const nextInputs = {
            ...addCitizenInfo,
            [name] : value,
        };

        setCitizenInfo(nextInputs);
    }

    const handleSaveCitizen = () => {
        setStudents([...students, students]); 
        // 변경된 내용을 저장하는 로직을 추가
        const token = userData.accessToken;
        if (!token) {
          navigate("/");
          return;
        }
    
        axBase(token)({
            method: "post",
            url: "/teacher/citizen", // 변경 내용 저장 엔드포인트
            data: { 
                // 변경된 내용을 서버로 전송
                nationNum: userData.nationNum,
                citizenNumber: students.citizenNumber,
                name: students.studentName,
                birthDate: students.birthdate, 
            },
        })
          .then((response) => {
            console.log("변경된 내용이 성공적으로 저장되었습니다.");
            alert("변경된 내용이 성공적으로 저장되었습니다.");
          })
          .catch((err) => {
            console.log("변경된 내용 저장 중 오류가 발생했습니다.", err.response.data.message);
          });
      };

    return(

        <div style={divStyle} className="border border-dark  border-3 p-3">
            
        <div className="d-flex justify-content-between">
            <div className="d-flex">{menu}</div>

            </div>

        <div className="border border-dark  border-3 m-5 p-5 bg-warning" style={borderRound}> 
        
        <div>
            <button onClick={handleShow}>신청</button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>국민 목록 설정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                                    학급번호 :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name="studentNumber" placeholder="학급번호" onChange={getAllInput} value={name}/>
                        </Col> 
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                                    학생이름 :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name="name" placeholder="학생이름" onChange={getAllInput} value={name}/>
                        </Col> 
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                                    생년월일 :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name="birthDate" placeholder="생년월일" onChange={getAllInput} value={name}/>
                        </Col> 
                    </Form.Group> 

                    </Form>
 
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleStudentConsumptionCreate()}>국민 등록하기</button>
                    <button onClick={handleClose}>취소</button>
                </Modal.Footer>
            </Modal>
        </div>

        </div>
        </div>
    )

}