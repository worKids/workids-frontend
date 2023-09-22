import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";  
 
export default function TeacherNation(){  
    const [state, setState] = useState(0);//버튼 클릭
    const userData = useRecoilValue(userState);  
    const [nationInfo, setNationInfo] = useState([]);  
    const navigate = useNavigate();
    const [showCitizenList, setShowCitizenList] = useState(false);

    const divListStyle = {
        borderRadius: "40px",
        backgroundColor: "#fffeee",
        height: "85%"
    }

 
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
 

    return(
        
        <div className="text-center border border-dark  border-3 p-3" style={{...divListStyle }}>
            <div className="container">
                <div className="row fs-2 p-2 m-2 justify-content-center">
                    <div className="col-3 ">{nationInfo.name} 나라</div>
                    <div className="col-3 ">{nationInfo.presidentName} 대통령</div>
                </div>
                <div className="row fs-3 p-2 justify-content-center " style={{textAlign:"left"}}>
                    <div className="col-4 ">화폐명: {nationInfo.moneyName}</div>
                    <div className="col-4 ">세율: {nationInfo.taxRate}%</div>
                </div>
                <div className="row fs-3 p-2  justify-content-center"  style={{textAlign:"left"}}>
                    <div className="col-4 ">월급 지급일: 월 {nationInfo.payDay}일</div>
                    <div className="col-4 ">나라 운영 상태: {nationInfo.state === 0 ? "운영 대기" : nationInfo.state === 1 ? "운영 중" : "종료"}</div>
                </div>
                <div className="row fs-3 p-2 justify-content-center"  style={{textAlign:"left"}}>
                    <div className="col-4 ">시작일: {nationInfo.startDate}</div>
                    <div className="col-4">종료일: {nationInfo.endDate}</div>
                </div>
                <div className="row fs-3 p-3 m-2 justify-content-center" >
                    <div className="col-8 text-center">참여코드: {nationInfo.code}</div>
                </div>
            </div>
        </div>
    );
}