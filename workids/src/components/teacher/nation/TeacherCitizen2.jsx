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

        //input 받아오기
    const getAllInput = (e) =>{
        const {name, value} = e.target;
        const nextInputs = {
            ...addConsumption,
            [name] : value,
        };

        setAddConsumption(nextInputs);
    }
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
                    <Modal.Title>소비 항목 신청하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                                    소비 항목 :
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name="content" placeholder="소비 항목" onChange={getAllInput} value={content}/>
                        </Col>
                        </Form.Group>
                    <div>
                        해당 소비 항목을 신청하시겠습니까?
                    </div>

                    </Form>
 
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleStudentConsumptionCreate()}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </Modal.Footer>
            </Modal>
        </div>

        </div>
        </div>
    )

}