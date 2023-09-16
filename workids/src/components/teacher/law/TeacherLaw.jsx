import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import TeacherLawCreate from "./TeacherLawCreate";
import TeacherLawDelete from "./TeacherLawDelete";
import TeacherLawUpdate from "./TeacherLawUpdate";

export default function TeacherLaw(){
    const lawMenu = ["법 조회", "벌금 부여", "벌칙 부여"];
    const [state, setState] = useState(0);//버튼 클릭
    const [userData, setUserData] = useRecoilState(userState);
    const [lawList, setLawList] = useState([]); //법 항목
    const [fineStudentList, setFineStudentList] = useState([]); //학생 벌금 부여 항목
    const [penaltyStudentList, setPenaltyStudentList] = useState([]); //학생 벌칙 부여 항목
    const navigate = useNavigate();

    const clickMenu = (idx) => {
        setState(idx);
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

    
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        console.log(userData.userNumber);
        console.log(userData.nationNum);

        //법 항목 리스트 뽑아오기
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

    //벌금-학생 리스트
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        //벌금-학생 항목 리스트 뽑아오기
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
            <td style={{ display: 'flex', flexDirection: 'column' }}>
                <button>취소</button>
            </td>
        </tr>
    ));
    

    //벌칙-학생 리스트
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        //벌칙-학생 항목 리스트 뽑아오기
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

    //학생 - 벌칙 출력
    const PenaltyStudentItems  = penaltyStudentList.map((menu, index) => (
        <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td>{menu.content}</td>
            <td>{menu.penalty}</td>
            <td style={{ display: 'flex', flexDirection: 'column' }}>
                <button>취소</button>
            </td>
        </tr>
    ));

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
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>학급 번호</th>
                                    <th style={{ width: '20%' }}>이름</th>
                                    <th style={{ width: '40%' }}>법 내용</th>
                                    <th style={{ width: '15%' }}>벌금</th>
                                    <th style={{ width: '15%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {FineStudentItems}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>학급 번호</th>
                                    <th style={{ width: '20%' }}>이름</th>
                                    <th style={{ width: '30%' }}>법 내용</th>
                                    <th style={{ width: '30%' }}>벌칙</th>
                                    <th style={{ width: '15%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {PenaltyStudentItems}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
    );
}