import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import dayjs from "dayjs"; //day format
import TeacherConsumptionCreate from "./TeacherConsumptionCreate";
import TeacherConsumptionUpdate from "./TeacherConsumptionUpdate";
import TeacherConsumptionDelete from "./TeacherConusmptionDelete";

export default function TeacherConsumption(){
    const consumptionMenu = ["소비 항목 조회", "국민 소비 관리"];
    const [state, setState] = useState(0);//버튼 클릭
    const [userData, setUserData] = useRecoilState(userState);
    const [consumptionList, setConsumptionList] = useState([]); //소비 항목 리스트
    const [outStandingConsumptionList, setOutStandingConsumptionList] = useState([]); //소비-학생 미결재 리스트
    const [approvalConsumptionList, setApprovalConsumptionList] = useState([]); // 소비-학생 결재 리스트

    const clickMenu = (idx) => {
        setState(idx);
      };

    const divStyle = {
    width: "80%",
    borderRadius: "40px",
    };

    //menuTab 관리
    const menu = consumptionMenu.map((menu, index) => (
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
    
    }, []);

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
    
    }, []);

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
    
    }, []);



    return(
        <div style={divStyle} className="border border-dark  border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                    <div>소비 관리</div>
                </div>
                {state === 0 ?(
                    //첫번째 탭 메뉴
                    <div>
                        <table style={{ marginLeft: '25%' }}>
                        {consumptionList.map((menu, index) => (
                            <tbody key={index}>
                                <tr key={`${index}_content`}>
                                    <td style={{ width: '30%' }}>소비 항목</td>
                                    <td style={{ width: '50%' }}>{menu.content}</td>
                                    <td><TeacherConsumptionUpdate consumptionNum={menu.consumptionNum} content={menu.content} amount={menu.amount}/></td>
                                    <td><TeacherConsumptionDelete consumptionNum={menu.consumptionNum}/></td>
                                </tr>
                                <tr key={`${index}_amount`}>
                                    <td>금액</td>
                                    <td key={index}>{menu.amount}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                        <div>
                            <TeacherConsumptionCreate />
                        </div>
                    </div>
                ):(
                    //두번째 탭 메뉴
                    <div>
                        두번째 탭
                    </div>
                )}
        </div>
    );

}