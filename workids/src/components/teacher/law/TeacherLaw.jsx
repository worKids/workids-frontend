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
    borderRadius: "40px",
    };

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
        <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td>{menu.content}</td>
            <td>{menu.fine}미소</td>
            <td>{menu.createdDate}</td>
            <td style={{ display: 'flex', flexDirection: 'column' }}>
                <TeacherLawStudentDelete tabType={0} lawNationStudentNum={menu.lawNationStudentNum}/>
            </td>
        </tr>
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
        <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td>{menu.content}</td>
            <td>{menu.penalty}</td>
            <td>{menu.createdDate}</td>
            <td>
                <input
                type="checkbox"
                value ={menu.lawNationStudentNum}
                checked={checkedItems.includes(menu.lawNationStudentNum)}
                onChange={() => handleCheckboxChange(menu.lawNationStudentNum)}
                />     
            </td>
            <td style={{ display: 'flex', flexDirection: 'column' }}>
                <TeacherLawStudentDelete tabType={1} lawNationStudentNum={menu.lawNationStudentNum}/>
            </td>
        </tr>
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
        <Form>
        <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                    부과 규칙 : 
                </Form.Label>
                <Col sm="6">
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
                <Form.Label column sm="3">
                    학급 번호: 
                </Form.Label>
                <Col sm="3">
                    <Form.Control type="text" name="citizenNumber" placeholder="학급번호" onChange={getTextInput} value={citizenNumber}/>
                </Col>
                <Col sm="1">
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
                    <div>
                        <table style={{ marginLeft: '25%' }}>
                        {lawList.map((menu, index) => (
                            <tbody key={index}>
                                <tr key={`${index}_content`}>
                                    <td style={{ width: '30%' }}>법 내용</td>
                                    <td style={{ width: '50%' }}>{menu.content}</td>
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
                                <tr key={`${index}_fine`}>
                                    <td>벌금</td>
                                    <td key={index}>{menu.fine}</td>
                                </tr>
                                <tr key={`${index}_penalty`}>
                                    <td>벌칙</td>
                                    <td key={index}>{menu.penalty}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                        <div>
                            <TeacherLawCreate />
                        </div>
                    </div>
                ) : state ===1? (
                    <div>
                        <div>
                            {AddLawStudent(0)}
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>학급 번호</th>
                                        <th style={{ width: '15%' }}>이름</th>
                                        <th style={{ width: '30%' }}>법 내용</th>
                                        <th style={{ width: '15%' }}>벌금</th>
                                        <th style={{ width: '20%' }}>벌금 부과일</th>
                                        <th style={{ width: '15%' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FineStudentItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            {AddLawStudent(1)}
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '11%' }}>학급 번호</th>
                                        <th style={{ width: '11%' }}>이름</th>
                                        <th style={{ width: '20%' }}>법 내용</th>
                                        <th style={{ width: '20%' }}>벌칙</th>
                                        <th style={{ width: '18%' }}>벌칙 부과일</th>
                                        <th style={{ width: '15%' }}>수행여부</th>
                                        <th style={{ width: '10%' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PenaltyStudentItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
    );
}