import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance"; 
import NationInfo from "./NationInfo";   
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Form from 'react-bootstrap/Form';  
import TeacherCitizen from "./TeacherCitizen";    
 
export default function TeacherNation(){ 
    const nationInfoMenu = [ "학급번호 연결", "나라 정보", "나라 정보 수정"];
    const [state, setState] = useState(0);//버튼 클릭
    const [pageState, setPageState] = useState(0); // 페이지 상태를 저장하는 state
    const userData = useRecoilValue(userState);  
    const [nationInfo, setNationInfo] = useState([]); 
    const [citizenList, setCitizenList] = useState([]); 
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showCitizenList, setShowCitizenList] = useState(false);

    const [citizenInfo, setCitizenInfo] = useState({
        nationNum:"",
        citizenNumber:"",
        name: "", 
        birthDate: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [citizenNumber, setCitizenNumber] = useState("");
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState(""); 

       
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

    const btn = {
        borderRadius: "30px", 
        backgroundColor: 'white', 
        color: 'black',
        marginRight: '10px'
    };

 

    const navigateToCitizenCreate = () => {
        setShowCitizenList(true); // 버튼 클릭 시 상태 변경
        <TreacherCitizen/>
      };
    
    const navigateToCitizenList = () => {
        //setShowCitizenList(false); // 버튼 클릭 시 상태 변경
        navigate("/teacher/citizen/list");
      };
    
    const navigateToCitizenList = () => {
        //setShowCitizenList(false); // 버튼 클릭 시 상태 변경
        navigate("/teacher/citizen/list");
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

    const handleSaveChanges = () => {
        // 변경된 내용을 저장하는 로직을 추가
        const token = userData.accessToken;
        if (!token) {
          navigate("/");
          return;
        }
    
        axBase(token)({
          method: "patch",
          url: "/nation", // 변경 내용 저장 엔드포인트
          data: { 
            // 변경된 내용을 서버로 전송
            nationNum: userData.nationNum,
            name: nationInfo.name,
            moneyName: nationInfo.moneyName,
            taxRate: nationInfo.taxRate,
            presidentName: nationInfo.presidentName,
            payDay: nationInfo.payDay,
            state: nationInfo.state,
            startDate: nationInfo.startDate,
            endDate: nationInfo.endDate,
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
 
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        console.log(userData.nationNum); 

        axBase(token)({
            method: "post",
            url: "/nation/list",
            data: {
                
                num: userData.nationNum,
            },
            }) 
            .then((response) => {
                console.log(response.data.data); 
                setNationInfo(response.data.data); // 상태 업데이트   
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    }, []);
 
 
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        console.log(userData.nationNum); 

        axBase(token)({
            method: "post",
            url: "/teacher/nation/citizen",
            data: { 
                num: userData.nationNum,
            },
            }) 
            .then((response) => {
                console.log(response.data.data); 
                setCitizenList(response.data.data); // 상태 업데이트   
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    }, [pageState]);
  
    //국민 목록 출력
    const CitizenItems = citizenList.map((item,index)=>(

        <div key={index} className="row justify-content-md-center p-1" style={borderRound}>
        <div className = "row"> 
        <div className="col-3 p-3">{item.citizenNumber}</div>
        <div className="col-3 p-3">{item.studentName}</div>   
        <div className="col-3 p-3">{item.birthDate}</div>   
        <button className="col-1 p-1" onClick={() => citizenDelete(index)} style={btn}>수정</button>
        <button className="col-1 p-1" onClick={() => citizenDelete(item.citizenNum)} style={btn}>삭제</button>
        </div>
        <hr></hr>
        </div>
    ));

    const handleSaveCitizen = () => {
        //setStudents([...students, students]); 
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
                // 변경된 내용을 서버로 전송 - 학급번호, 이름, 생년월일
                nationNum: userData.nationNum,
                citizenNumber: citizenNumber, 
                name: name, 
                birthDate: birthDate,
            },
        })
          .then((response) => { 
            alert("국민 등록 성공!");
            handleClose(); // 국민 등록 성공 후 모달 닫기
            setPageState(pageState+1); // pageState 변경  
          })
          .catch((err) => {  
            console.log(err.response.data.message);
            alert(err.response.data.message);
          });
      };

    // 삭제
    const citizenDelete = (citizenNum) => {
        // 변경된 내용을 저장하는 로직을 추가
        const token = userData.accessToken;
        if (!token) {
        navigate("/");
        return;
        }

        axBase(token)({
        method: "delete",
        url: "/teacher/citizen",  
        data: { 
            // 변경된 내용을 서버로 전송
            num: citizenNum, 
        },
        })
        .then((response) => {
            console.log("삭제 완료!");
            alert("삭제 완료!");
            handleClose(); // 국민 등록 성공 후 모달 닫기 
            window.location.reload();
        })
        .catch((err) => {
            console.log(err.response.data.message);
        });
    };


 

    return ( 
  
        <div style={divStyle} className="border border-dark  border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                    <div>나라 정보</div>
                </div>
                {state === 1 ? (
                    <div>
                        <NationInfo/>
                    </div> 
                ) : state ===2? ( 
                    <div className="d-flex justify-content-center align-items-center">
                    <div>
                        {/* 나라 정보 수정 폼 */}
                        <div className="row">
                            <div className="col-md-6"> 
                            <div className="mb-4">
                                <label htmlFor="nationName" className="form-label"> 
                                나라명:
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="moneyName" className="form-label">
                                화폐명:
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="taxRate" className="form-label">
                                세율:
                                </label>
                            </div> 
                            <div className="mb-4">
                                <label htmlFor="payDay" className="form-label">
                                월급지급일:
                                </label>
                            </div> 
                            <div className="mb-4">
                                <label htmlFor="presidentName" className="form-label">
                                대통령명:
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">
                                나라운영상태:
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">
                                운영 시작일:
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">
                                운영 종료일:
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="code" className="form-label">
                                참여코드:
                                </label>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="nationName"
                                value={nationInfo.name}
                                onChange={(e) => setNationInfo({ ...nationInfo, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="moneyName"
                                value={nationInfo.moneyName}
                                onChange={(e) => setNationInfo({ ...nationInfo, moneyName: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="taxRate"
                                value={nationInfo.taxRate}
                                onChange={(e) => setNationInfo({ ...nationInfo, taxRate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="payDay"
                                value={nationInfo.payDay}
                                onChange={(e) => setNationInfo({ ...nationInfo, payDay: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="presidentName"
                                value={nationInfo.presidentName}
                                onChange={(e) => setNationInfo({ ...nationInfo, presidentName: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="state"
                                value={nationInfo.state}
                                onChange={(e) => setNationInfo({ ...nationInfo, state: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="startDate"
                                value={nationInfo.startDate}
                                onChange={(e) => setNationInfo({ ...nationInfo, startDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="endDate"
                                value={nationInfo.endDate}
                                onChange={(e) => setNationInfo({ ...nationInfo, endDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                {nationInfo.code}
                            </div>
                        </div> 
                    </div>
            
                    <div className="text-end"> {/* 오른쪽 정렬 */}
                    <button className="btn btn-secondary" onClick={handleSaveChanges}>
                      변경내용 저장
                    </button>
                    </div>
                  </div>
                  </div>
             
                ) : ( 
  
                    (citizenList.length === 0)
                    ?
                        <div className="border border-dark  border-3 m-5 p-5 bg-warning" style={borderRound}> 
                        <p>국민 목록 설정이 되어있지 않습니다.</p>
                        <p>국민 목록을 설정해주세요 ~ !</p>
                        <p/>
                        {navigateToCitizenCreate ? (
                        <div>
                        <button className="btn btn-primary" onClick={handleShow} style={btn}>국민 목록 설정하기</button>
                        <Modal show={show} onHide={handleClose}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                            <Modal.Header>
                                <Modal.Title>국민 등록하기</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                                학급번호 :
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                        type="text" 
                                        name="citizenNumber" 
                                        placeholder="학급번호" 
                                        onChange = {(e) => setCitizenNumber(e.target.value)}
                                        value={citizenNumber}/>
                                    </Col> 
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                                학생이름 :
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                        type="text" 
                                        name="name" 
                                        placeholder="학생이름"   
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        />
                                    </Col> 
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                                생년월일 :
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                        type="text" 
                                        name="birthDate" 
                                        placeholder="생년월일" 
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        value={birthDate}
                                        />
                                    </Col> 
                                </Form.Group> 

                                </Form>
            
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleSaveCitizen}>국민 등록하기</button>
            
                                <button onClick={handleClose}>취소</button>
                            </Modal.Footer>
                        </Modal>
                        </div>
                        
                        ) : null}  
                        </div>
                    : 
                        <div className="border border-dark  border-3 m-5 p-5 bg-white" style={borderRound}> 
                            <div className = "row"> 
                                <div className="col-3 p-2">학급 번호</div>
                                <div className="col-3 p-2">학생 이름</div>   
                                <div className="col-3 p-2">생년월일</div>   
                            </div> 
                                <hr></hr> 
                                {CitizenItems}
                                <p/>  
                                <button className="col-10 p-2" onClick={handleShow} style={btn}>국민 추가</button>
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
                                            <Col sm="3">
                                                <Form.Control 
                                                type="text" 
                                                name="citizenNumber" 
                                                placeholder="학급번호" 
                                                onChange = {(e) => setCitizenNumber(e.target.value)}
                                                value={citizenNumber}/>
                                            </Col> 
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                        학생이름 :
                                            </Form.Label>
                                            <Col sm="3">
                                                <Form.Control 
                                                type="text" 
                                                name="name" 
                                                placeholder="학생이름"   
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                />
                                            </Col> 
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                        생년월일 :
                                            </Form.Label>
                                            <Col sm="3">
                                                <Form.Control 
                                                type="text" 
                                                name="birthDate" 
                                                placeholder="생년월일" 
                                                onChange={(e) => setBirthDate(e.target.value)}
                                                value={birthDate}
                                                />
                                            </Col> 
                                        </Form.Group> 

                                        </Form>
                    
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button onClick={handleSaveCitizen}>국민 등록하기</button>
                                        <button onClick={handleClose}>취소</button>
                                    </Modal.Footer>
                                </Modal>
               
                        </div>
                )}
            </div>
    );
}