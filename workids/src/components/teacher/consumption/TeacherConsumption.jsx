import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import TeacherConsumptionCreate from "./TeacherConsumptionCreate";
import TeacherConsumptionUpdate from "./TeacherConsumptionUpdate";
import TeacherConsumptionDelete from "./TeacherConusmptionDelete";
import TeacherConsumptionProcess from "./TeacherConsumptionProcess";

export default function TeacherConsumption(){
    const consumptionMenu = ["소비 항목 조회", "국민 소비 관리"];
    const [state, setState] = useState(0);//버튼 클릭
    const [userData, setUserData] = useRecoilState(userState);
    const [consumptionList, setConsumptionList] = useState([]); //소비 항목 리스트
    const [outStandingConsumptionList, setOutStandingConsumptionList] = useState([]); //소비-학생 미결재 리스트
    const [approvalConsumptionList, setApprovalConsumptionList] = useState([]); // 소비-학생 결재 리스트
    const navigate = useNavigate();
    const numberOfConsumption = consumptionList.length;
    const [updateCheck, setUpdateCheck] = useState(0);

    const handleUpdateCheck = () => {
        setUpdateCheck((updateCheck + 1) % 2);
    };

    const clickMenu = (idx) => {
        setState(idx);
      };

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

    const firstBlock ={
        float: "left",
        marginLeft: "2vh",
        paddingTop: "3vh",
        borderRadius: "40px",
        width: "48%",
        height: "90%",
        backgroundColor: "#E1F1F5",
        border: "solid 5px #BFE0FF"
    }

    const hrStyle = {
        width: "100%",
        height: "3px",
        backgroundColor: "black",
        margin : "5px"
    }

    const divListStyle = {
        borderRadius: "40px",
        backgroundColor: "#fffeee",
        height: "85%"
    }

    const secondBlock ={
        display: "inline-block",
        marginLeft: "2vh",
        paddingTop: "3vh",
        borderRadius: "40px",
        width: "47%",
        height: "90%",
        backgroundColor: '#D9D9D9',
        border: "solid 5px #B6B6B6"
    }

    //내용 길어질때 col 속성
    const colStyle = {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }

    //menuTab 관리
    const menu = consumptionMenu.map((menu, index) => (
        <div
          key={index}
          onClick={() => clickMenu(index)}
          className={`menu-button  ${
            state === index ? "bg-warning text-white hoverable" : "hoverable"
          }`}
        >
          {menu}
        </div>
    ));

    //소비 항목 리스트 가져오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/consumption/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setConsumptionList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    
    }, [updateCheck]);

    //소비-학생 미결재 리스트 가져오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/teacher/consumption/citizen/outstanding/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setOutStandingConsumptionList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    
    }, [updateCheck]);

    //미결재 리스트 출력
    const outStadndingItems = outStandingConsumptionList.map((menu,index) => (
        <div>
            <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                <div className="col-sm-1 p-2" style={colStyle}>{menu.citizenNumber}</div>
                <div className="col-sm-2 p-2" style={colStyle}>{menu.studentName}</div>
                <div className="col-sm-3 p-2" style={{...colStyle, overflow:"hidden"}}>{menu.content}</div>
                <div className="col-sm-1 p-2" style={colStyle}>{menu.amount}</div>
                <div className="col-sm-3 p-2" style={colStyle}>{menu.createdDate}</div>
                <div className="col-sm-2 p-2" style={colStyle}><TeacherConsumptionProcess consumptionNationStudentNum={menu.consumptionNationStudentNum} state={menu.state} onUpdate={handleUpdateCheck}/></div>
            </div>
            <div style={{height:"0.4px", backgroundColor:"black"}}> </div>
        </div>
    ));

    //소비-학생 결재 리스트 가져오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/teacher/consumption/citizen/approval/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setApprovalConsumptionList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    
    }, [updateCheck]);

    //결재 리스트 출력
    const approvalItems = approvalConsumptionList.map((menu,index) => (
        <div>
            <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                <div className="col-sm-1 p-2" style={colStyle}>{menu.citizenNumber}</div>
                <div className="col-sm-2 p-2" style={colStyle}>{menu.studentName}</div>
                <div className="col-sm-3 p-2" style={{...colStyle, overflow:"hidden"}}>{menu.content}</div>
                <div className="col-sm-1 p-2" style={colStyle}>{menu.amount}</div>
                <div className="col-sm-3 p-2" style={colStyle}>{menu.updatedDate}</div>
                <div className="col-sm-2 p-2" style={colStyle}>{menu.state === 1 ? "승인됨" : "거절됨"}</div>
            </div>
            <div style={{height:"0.4px", backgroundColor:"black"}}> </div>
        </div>
    ));


    return(
        <div style={divStyle} className="border border-dark mt-4 border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                </div>
                {state === 0 ?(
                    //첫번째 탭 메뉴
                    numberOfConsumption === 0 ?(
                    <div className="border border-dark  border-3 p-3" style={{ ...divStyle2, height: "65vh" }}>
                    <div className="h-100 d-flex justify-content-center align-items-center" >
                        <div>
                            소비 항목을 생성해주세요.
                        </div>
                        <div className="justify-content-end p-3">
                            <TeacherConsumptionCreate onUpdate={handleUpdateCheck}/>
                        </div>
                    </div>
                    </div>
                    ):(
                    <div className="border border-dark  border-3 p-3" style={{ ...divStyle2, height: "65vh" }}>
                    <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>   
                    <div className=" border border-dark  border-3 p-3" style={{...divListStyle }}>
                        <div className="overflow-auto m-3 p-4 scrollCss " style={{maxHeight:'45vh'}}>
                        <table style={{...colStyle, marginLeft:'auto', marginRight:'auto', width:'90%'}}>
                            {consumptionList.map((menu, index) => (
                                <tbody key={index} style={{fontSize:'20px', height:'15vh'}}>
                                    <tr key={`${index}_content`} style={{borderTop: '3px solid black', padding:'10px'}}>
                                        <td className="fs-4" style={{ width: '20%' }}>소비 항목</td>
                                        <td className="fs-4" style={{ width: '30%' }}>{menu.content}</td>
                                        <td className="fs-4"  style={{ width: '5%'}}><TeacherConsumptionUpdate consumptionNum={menu.consumptionNum} content={menu.content} amount={menu.amount} onUpdate={handleUpdateCheck}/></td>
                                        <td className="fs-4"  style={{ width: '5%'}}><TeacherConsumptionDelete consumptionNum={menu.consumptionNum} onUpdate={handleUpdateCheck}/></td>
                                    </tr>
                                    <tr key={`${index}_amount`}>
                                        <td className="fs-4">금액</td>
                                        <td className="fs-4" key={index}>{menu.amount}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                        </div>
                    </div>
                    <div className="ontainer d-flex justify-content-end p-2">
                        <TeacherConsumptionCreate onUpdate={handleUpdateCheck}/>
                    </div>
                </div>
                    )
                ):(
                    //두번째 탭 메뉴
                    <>
                    <div className="border border-dark  border-3 p-3" style={{ ...divStyle2, height: "65vh" }}>
                    <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
                        <div style={firstBlock} className="container justify-content-md-center">
                            <h3 style={{textAlign:'center'}}>결재 완료</h3>
                            <div className="row justify-content-md-center p-1" style={{ fontSize: "20px", textAlign: "center" }}>
                                <div className="col-sm-1 p-1" style={colStyle}>번호</div>
                                <div className="col-sm-2 p-1" style={colStyle}>이름</div>
                                <div className="col-sm-3 p-1" style={{...colStyle, overflow:"hidden"}}>소비내역</div>
                                <div className="col-sm-1 p-1" style={colStyle}>금액</div>
                                <div className="col-sm-3 p-1" style={colStyle}>승인일</div>
                                <div className="col-sm-2 p-1" style={colStyle}></div>
                                <div style={hrStyle}></div>
                            </div>
                            <div className="scrollCss" style={{height:'70%', overflowX:"hidden", overflowY:"auto"}}>
                                {approvalItems}
                            </div>
                        </div>
                    
                        <div style={secondBlock} className="container justify-content-md-center">
                            <h3 style={{textAlign:'center'}}>미결재</h3>
                            
                            <div className="row justify-content-md-center p-1" style={{ fontSize: "20px", textAlign: "center" }}>
                                <div className="col-sm-1 p-1" style={colStyle}>번호</div>
                                <div className="col-sm-2 p-1" style={colStyle}>이름</div>
                                <div className="col-sm-3 p-1" style={{...colStyle, overflow:"hidden"}}>소비내역</div>
                                <div className="col-sm-1 p-1" style={colStyle}>금액</div>
                                <div className="col-sm-3 p-1" style={colStyle}>신청일</div>
                                <div className="col-sm-2 p-1" style={colStyle}></div>
                                <div style={hrStyle}></div>
                            </div>
                            <div className="scrollCss" style={{height:'70%', overflowX:"hidden", overflowY:"auto"}}>
                                {outStadndingItems}
                            </div>
                        </div>
                        </div>
                        </>
                )}
        </div>
    );

}