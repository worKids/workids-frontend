import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeacherLawCreate from "./TeacherLawCreate";
import TeacherLawDelete from "./TeacherLawDelete";
import TeacherLawUpdate from "./TeacherLawUpdate";
import TeacherLawStudentCreate from "./TeacherLawStudentCreate";
import TeacherLawStudentDelete from "./TeacherLawStudentDelete";
import { auto } from "@popperjs/core";

export default function TeacherLaw(){
    const lawMenu = ["법 조회", "벌금 부여", "벌칙 부여"];
    const [state, setState] = useState(0);//버튼 클릭
    const [userData, setUserData] = useRecoilState(userState);
    const [lawList, setLawList] = useState([]); //법 항목
    const [fineStudentList, setFineStudentList] = useState([]); //학생 벌금 부여 항목
    const [penaltyStudentList, setPenaltyStudentList] = useState([]); //학생 벌칙 부여 항목
    const [selectLawNum, setSelectLawNum] = useState(0);
    const navigate = useNavigate();
    const [addLawStudent, setAddLawStudent] = useState({
        content: "",
        citizenNumber: 0,
      });
    const {content, citizenNumber} = addLawStudent;

    const clickMenu = (idx) => {
        setState(idx);
        onReset();
        if(idx=1){
            setCheckedItems(initialCheckedItems); //checkbox 초기 설정
        }
      };

    const divStyle = {
        width: "80%",
        height: "80vh",
        borderRadius: "40px"
    };

    const divLawStudentList = {
        width: "90%",
        fontSize: "18px",
        textAlign: "center",
        marginTop: "2vh",
        height: "33vh",
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        overflow: "auto"
    }

    //법 메뉴의 탭들
    const menu = lawMenu.map((menu, index) => (
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

    //법 항목 리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
        method: "post",
        url: "/law/list",
        data: {
            nationNum: userData.nationNum,
        },
        })
        .then((response) => {
            console.log(response.data.data);
            setLawList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

    }, []);

    //벌금-학생 항목 리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        
        axBase(token)({
            method: "post",
            url: "/teacher/law/fine/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setFineStudentList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    }, []);

    //학생 - 벌금 출력
    const FineStudentItems  = fineStudentList.map((menu, index) => (
        <div key={index} className="row m-3 p-1" style={{textAlign:'center'}}>
            <div className="col-2">{menu.citizenNumber}</div>
            <div className="col-2">{menu.studentName}</div>
            <div className="col-3">{menu.content}</div>
            <div className="col-2">{menu.fine}미소</div>
            <div className="col-2">{menu.createdDate}</div>
            <div className="col-1"><TeacherLawStudentDelete tabType={0} lawNationStudentNum={menu.lawNationStudentNum}/></div>
        </div>
    ));
    

    //벌칙-학생 항목 리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/teacher/law/penalty/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setPenaltyStudentList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    }, []);

    //수행여부 (check) 하기
    function CompletePenalty(penaltyCompleteState, lawNationStudentNum) {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        axBase(token)({
            method: "post",
            url: "/teacher/law/penalty/check",
            data: {
                penaltyCompleteState: penaltyCompleteState,
                lawNationStudentNum: lawNationStudentNum,
            },
        })
        .then((response) => {
        console.log("수행 여부 확인");
        })
        .catch((err) => {
        alert(err.response.data.message);
        });
    }

    //초기 checkbox 설정
    const initialCheckedItems = penaltyStudentList.reduce((acc, menu) => {
        if (menu.penaltyCompleteState === 1) {
          acc.push(menu.lawNationStudentNum);
        }
        return acc;
    }, []);

    const [checkedItems, setCheckedItems] = useState([]); //수행여부 checkbox

    //checkbox 누를때 발생하는 event
    const handleCheckboxChange = (value) => {
        
        // value가 이미 배열에 있는지 확인하고, 있으면 제거하고 없으면 추가
        if (checkedItems.includes(value)) {
          setCheckedItems(checkedItems.filter((item) => item !== value));
          CompletePenalty(0,value);  
        } else {
          setCheckedItems([...checkedItems, value]);
          CompletePenalty(1,value);
        }
    };

    //학생 - 벌칙 출력
    const PenaltyStudentItems  = penaltyStudentList.map((menu, index) => (
        <div key={index} className="row m-3 p-1" style={{textAlign:'center'}}>
            <div className="col-sm-2">{menu.citizenNumber}</div>
            <div className="col-sm-2">{menu.studentName}</div>
            <div className="col-sm-2">{menu.content}</div>
            <div className="col-sm-2">{menu.penalty}</div>
            <div className="col-sm-2">{menu.createdDate}</div>
            <div className="col-sm-1">
                <input
                type="checkbox"
                value ={menu.lawNationStudentNum}
                checked={checkedItems.includes(menu.lawNationStudentNum)}
                onChange={() => handleCheckboxChange(menu.lawNationStudentNum)}
                />  
            </div>
            <div className="col-sm-1"><TeacherLawStudentDelete tabType={1} lawNationStudentNum={menu.lawNationStudentNum}/></div>
        </div>
    ));

    //input select 값 채우기
    const getSelectInput = (e) =>{
        const {name, value} = e.target;
        const nextInputs = {
            ...addLawStudent,
            [name] : value,
        };

        //객체를 새로운 상태로 쓰겠다. 
        setAddLawStudent(nextInputs);

        const selectedOption = e.target.selectedOptions[0];
        setSelectLawNum(selectedOption.getAttribute("data-lawnum"));
    }

    //input text 값 채우기
    const getTextInput = (e) =>{
        const {name, value} = e.target;
        const nextInputs = {
            ...addLawStudent,
            [name] : value,
        };

        //객체를 새로운 상태로 쓰겠다. 
        setAddLawStudent(nextInputs);
    }

    //탭 누를때마다 값 reset
    const onReset = () => {
        setAddLawStudent({
            content: "",
            citizenNumber: 0,
        })
        setSelectLawNum(0);
    };

    //벌금-벌칙 부여하는 부분
    const AddLawStudent = (tabType)=>(
        <Form style={{fontSize:'23px'}}>
        <Form.Group as={Row} className="mb-3">
                <Form.Label column md="3">
                    부과 규칙 : 
                </Form.Label>
                <Col md="9">
                {tabType===0?(
                    <Form.Select onChange={getSelectInput} name="content">
                        <option>부과 규칙</option>
                        {lawList.map((item, index) => (
                            item.type === 0 && (
                                <option key={index} value={item.content} data-lawnum={item.lawNum}>
                                    {item.content}
                                </option>
                            )
                        ))}
                    </Form.Select>
                ):(
                    <Form.Select onChange={getSelectInput} name="content">
                        <option>부과 규칙</option>
                        {lawList.map((item, index) => (
                            item.type === 1 && (
                                <option key={index} value={item.content} data-lawnum={item.lawNum}>
                                    {item.content}
                                </option>
                            )
                        ))}
                    </Form.Select>
                )}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column md="3">
                    학급 번호: 
                </Form.Label>
                <Col md="8">
                    <Form.Control type="text" name="citizenNumber" placeholder="학급번호" onChange={getTextInput} value={citizenNumber}/>
                </Col>
                <Col md="1">
                    <TeacherLawStudentCreate tabType={tabType} citizenNumber={citizenNumber} lawNum={selectLawNum} />
                </Col>
            </Form.Group>
        </Form>
    )

    //학생에게 법 

    return (
        <div style={divStyle} className="border border-dark  border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                    <div>법 관리</div>
                </div>
                {state === 0 ? (
                    <div className="container justify-content-md-center" style={{width:'90%'}}>
                    <div className="overflow-auto m-3 p-4" style={{height:'50vh' }}>
                        <table style={{marginLeft:'auto', marginRight:'auto', width:'90%'}}>
                        {lawList.map((menu, index) => (
                            <tbody key={index} style={{fontSize:'20px', height:'15vh'}}>
                                <tr key={`${index}_content`} style={{borderTop: '3px solid black', padding:'10px'}}>
                                    <td style={{ width: '30%'}}>법 내용</td>
                                    <td style={{ width: '50%'}}>{menu.content}</td>
                                    {menu.type === 0 && (
                                        <>
                                            <td><TeacherLawUpdate lawNum={menu.lawNum} content={menu.content} fine={menu.fine}  /></td>
                                            <td><TeacherLawDelete lawNum={menu.lawNum} /></td>
                                            
                                        </>
                                    )}
                                    {menu.type === 1 && (
                                        <>
                                            <td></td>
                                            <td><TeacherLawDelete lawNum={menu.lawNum}/></td>
                                        </>
                                    )}
                                </tr>
                                {menu.type === 0 && (
                                    <tr key={`${index}_fine`}>
                                        <td>벌금</td>
                                        <td key={index}>{menu.fine}</td>
                                    </tr>
                                )}
                                {menu.type === 1 && (
                                    <tr key={`${index}_penalty`}>
                                        <td>벌칙</td>
                                        <td key={index}>{menu.penalty}</td>
                                    </tr>
                                )}
                            </tbody>
                        ))}
                    </table>
                        </div>
                        <div className="container d-flex justify-content-end p-3">
                            <TeacherLawCreate />
                        </div>
                    </div>
                ) : state ===1? (
                    <div>
                        <div className="container justify-content-md-center p-4" style={{width:'60%', height:'30%', marginTop:'4vh'}}>
                            {AddLawStudent(0)}
                        </div>
                        <div style={divLawStudentList} className="container justify-content-md-center ">
                            <div className="row m-3 p-1">
                                <div className="col-2">학급번호</div>
                                <div className="col-2">이름</div>
                                <div className="col-3">법 내용</div>
                                <div className="col-2">벌금</div>
                                <div className="col-2">부과일</div>
                                <div className="col-1"></div>
                            </div>
                            {FineStudentItems}    
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="container justify-content-md-center p-4" style={{width:'60%', height:'30%', marginTop:'4vh'}}>
                            {AddLawStudent(1)}
                        </div>
                        <div style={divLawStudentList} className="container justify-content-md-center ">
                            <div className="row m-3 p-1">
                                <div className="col-sm-2">학급번호</div>
                                <div className="col-sm-2">이름</div>
                                <div className="col-sm-2">법 내용</div>
                                <div className="col-sm-2">벌칙</div>
                                <div className="col-sm-2">부과일</div>
                                <th className="col-sm-1">체크</th>
                                <div className="col-sm-1"></div>
                            </div>
                            {PenaltyStudentItems}    
                        </div>
                    </div>
                )}
            </div>
    );
}