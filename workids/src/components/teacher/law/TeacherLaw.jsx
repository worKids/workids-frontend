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
    const numberOfLawList = lawList.length;
    const [addLawStudent, setAddLawStudent] = useState({
        content: "",
        citizenNumber: null,
      });
    const {content, citizenNumber} = addLawStudent;
    const [updateCheck, setUpdateCheck] = useState(0);

     // updateCheck 상태를 변경하는 함수
    const handleUpdateCheck = () => {
        setUpdateCheck((updateCheck + 1) % 2);
        onReset();
    };

    //내용 길어질때 col 속성
    const colStyle = {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }

    const clickMenu = (idx) => {
        setState(idx);
        onReset();
        if(idx=1){
            setCheckedItems(initialCheckedItems); //checkbox 초기 설정
        }
    };

    const hrStyle = {
        width: "100%",
        height: "5px",
        backgroundColor: "black",
        margin : "4px"
    }

    const divStyle = {
        width: "80%",
        height: "80vh",
        borderRadius: "40px",
        backgroundColor:"#FFFEEE",
    };

    const divStyle2 = {
        borderRadius: "40px",
        backgroundColor: "#FEE173",
    };

    const divLawStudentList = {
        width: "90%",
        fontSize: "18px",
        textAlign: "center",
        borderRadius:"40px",
        backgroundColor: '#fffeee',
        height: "38.5vh"
    }

    const divListStyle = {
        borderRadius: "40px",
        backgroundColor: "#fffeee",
        height: "85%"
    }


    //법 메뉴의 탭들
    const menu = lawMenu.map((menu, index) => (
        <div
          key={index}
          onClick={() => clickMenu(index)}
          className={`menu-button ${
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

    }, [updateCheck]);

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

    }, [updateCheck]);

    //학생 - 벌금 출력
    const FineStudentItems  = fineStudentList.map((menu, index) => (
        <div key={index} className="row m-2 p-2 fs-4" style={{...colStyle,textAlign:'center'}}>
            <div className="col-1">{menu.citizenNumber}</div>
            <div className="col-2">{menu.studentName}</div>
            <div className="col-3"  style={{overflow:"hidden"}}>{menu.content}</div>
            <div className="col-2">{menu.fine}</div>
            <div className="col-3">{menu.createdDate}</div>
            <div className="col-1"><TeacherLawStudentDelete tabType={0} lawNationStudentNum={menu.lawNationStudentNum} onUpdate={handleUpdateCheck}/></div>
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

    }, [updateCheck]);

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
        <div key={index} className="row m-1 p-2 fs-5" style={{...colStyle,textAlign:'center'}}>
            <div className="col-sm-1">{menu.citizenNumber}</div>
            <div className="col-sm-1">{menu.studentName}</div>
            <div className="col-sm-3" style={{overflow:"hidden"}}>{menu.content}</div>
            <div className="col-sm-3" style={{overflow:"hidden"}}>{menu.penalty}</div>
            <div className="col-sm-2">{menu.createdDate}</div>
            <div className="col-sm-1">
                <input
                type="checkbox"
                value ={menu.lawNationStudentNum}
                checked={checkedItems.includes(menu.lawNationStudentNum)}
                onChange={() => handleCheckboxChange(menu.lawNationStudentNum)}
                style={{width:"2vh", height:"2vh"}}
                />  
            </div>
            <div className="col-sm-1"><TeacherLawStudentDelete tabType={1} lawNationStudentNum={menu.lawNationStudentNum} onUpdate={handleUpdateCheck}/></div>
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
        if (name === "content" && value === null) {
            onReset();
        }

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
            citizenNumber: null,
        })
        setSelectLawNum(0);

        const selectElement = document.querySelector('select[name="content"]');
        if(selectElement !== null){
            selectElement.value = "부과 규칙";
        }
    };

    //벌금-벌칙 부여하는 부분
    const AddLawStudent = (tabType)=>(
        <Form style={{ fontSize: '23px' }}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column md="3">
                    부과 규칙 :
                </Form.Label>
                <Col md="9">
                    {tabType === 0 ? (
                        <Form.Select onChange={getSelectInput} name="content" defaultValue={null}>
                            <option value={null}>부과 규칙</option>
                            {lawList.map((item, index) => (
                                item.type === 0 && (
                                    <option key={index} value={item.content} data-lawnum={item.lawNum}>
                                        {item.content}
                                    </option>
                                )
                            ))}
                        </Form.Select>
                    ) : (
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
                <Col md="7">
                    <Form.Control type="number" name="citizenNumber" placeholder="학급번호" value={citizenNumber || ''} onChange={getTextInput} />
                </Col>
                <Col md="2">
                    <TeacherLawStudentCreate tabType={tabType} citizenNumber={citizenNumber} lawNum={selectLawNum} onUpdate={handleUpdateCheck} />
                </Col>
            </Form.Group>
        </Form>
        
    )
    
    //학생에게 법 

    return (
        <div style={divStyle} className="border border-dark mt-4 border-3 p-3" >
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                </div>
                {state === 0 ? (
                    
                    numberOfLawList === 0 ?(
                        <div className="h-100 d-flex justify-content-center align-items-center">
                            <div>법을 제정해주세요.</div>
                            <div className="justify-content-end p-3">
                                <TeacherLawCreate onUpdate={handleUpdateCheck}/>
                            </div>
                        </div>
                    ) :(
                    <div className="border border-dark  border-3 p-3" style={{ ...divStyle2, height: "65vh" }}>
                    <div className="container d-flex justify-content-end">(단위:미소)</div>
                    <div className=" border border-dark  border-3 p-3" style={{...divListStyle }}>
                        <div className="overflow-auto m-3 p-4 scrollCss " style={{maxHeight:'45vh'}}>
                        <table style={{...colStyle, marginLeft:'auto', marginRight:'auto', width:'90%'}}>
                            {lawList.map((menu, index) => (
                                <tbody key={index} style={{fontSize:'20px', height:'15vh'}}>
                                    <tr key={`${index}_content`} style={{borderTop: '3px solid black', padding:'10px'}}>
                                        <td className="fs-4" style={{ width: '20%'}}>법 내용 : </td>
                                        <td className="fs-4" style={{ width: '30%'}}>{menu.content}</td>
                                        {menu.type === 0 && (
                                            <>
                                                <td className="fs-4" style={{ width: '5%'}}><TeacherLawUpdate lawNum={menu.lawNum} content={menu.content} fine={menu.fine} onUpdate={handleUpdateCheck} /></td>
                                                <td className="fs-4" style={{ width: '5%'}}><TeacherLawDelete lawNum={menu.lawNum} onUpdate={handleUpdateCheck}/></td>
                                                
                                            </>
                                        )}
                                        {menu.type === 1 && (
                                            <>
                                                <td></td>
                                                <td><TeacherLawDelete lawNum={menu.lawNum} onUpdate={handleUpdateCheck}/></td>
                                            </>
                                        )}
                                    </tr>
                                    {menu.type === 0 && (
                                        <tr key={`${index}_fine`}>
                                            <td className="fs-4">벌금 : </td>
                                            <td key={index} className="fs-4">{menu.fine}</td>
                                        </tr>
                                    )}
                                    {menu.type === 1 && (
                                        <tr key={`${index}_penalty`}>
                                            <td className="fs-4">벌칙 : </td>
                                            <td className="fs-4" key={index}>{menu.penalty}</td>
                                        </tr>
                                    )}
                                </tbody>
                            ))}
                        </table>
                        </div>
                        </div>
                        <div className="container d-flex justify-content-end p-2">
                            <TeacherLawCreate onUpdate={handleUpdateCheck}/>
                        </div>
                    </div>
                    )
                ) : state ===1? (
                    <div className="border border-dark  border-3 p-3" style={{ ...divStyle2, height: "65vh" }}>
                        <div className="container justify-content-md-center" style={{width:'60%', height:'30%', marginTop:'1vh'}}>
                            {AddLawStudent(0)}
                        </div>
                        <div className="container d-flex justify-content-end">(단위:미소)</div>
                        <div style={divLawStudentList} className="container justify-content-md-center border border-dark  border-3 ">
                            <div className="row m-2 p-1 fs-4" style={colStyle}>
                                <div className="col-1">번호</div>
                                <div className="col-2">이름</div>
                                <div className="col-3">법 내용</div>
                                <div className="col-2">벌금</div>
                                <div className="col-3">부과일</div>
                                <div className="col-1"></div>
                                <div style={hrStyle}></div>
                            </div>
                            <div className="overflow-auto scrollCss" style={{height:'28vh'}}>
                                {FineStudentItems}    
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border border-dark  border-3 p-3" style={{ ...divStyle2, height: "65vh" }}>
                        <div className="container justify-content-md-center" style={{width:'60%', height:'30%', marginTop:'1vh'}}>
                            {AddLawStudent(1)}
                        </div>
                        <div className="container d-flex justify-content-end">(단위:미소)</div>
                        <div style={divLawStudentList} className="container justify-content-md-center border border-dark  border-3 ">
                            <div className="row m-1 p-1 fs-4" style={colStyle}>
                                <div className="col-sm-1">번호</div>
                                <div className="col-sm-1">이름</div>
                                <div className="col-sm-3">법 내용</div>
                                <div className="col-sm-3">벌칙</div>
                                <div className="col-sm-2">부과일</div>
                                <div className="col-sm-1">체크</div>
                                <div className="col-sm-1"></div>
                                <div style={hrStyle}></div>
                            </div>
                            <div className="overflow-auto scrollCss" style={{height:'28vh'}}>
                                {PenaltyStudentItems}   
                            </div> 
                        </div>
                    </div>
                )}
            </div>
    );
}