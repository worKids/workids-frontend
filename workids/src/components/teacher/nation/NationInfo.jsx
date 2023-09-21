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
        <div className="d-flex justify-content-center align-items-center">
        <div> 
        <p>나라명: {nationInfo.name}</p>
        <p>화폐명: {nationInfo.moneyName}</p>
        <p>세율: {nationInfo.taxRate}</p>
        <p>월급지급일: {nationInfo.payDay}</p>
        <p>대통령명: {nationInfo.presidentName}</p>
        <p>나라운영상태: {nationInfo.state}</p>
        <p>운영시작일: {nationInfo.startDate}</p>
        <p>운영종료일: {nationInfo.endDate}</p>
        <p>참여코드: {nationInfo.code}</p>
        </div>
        </div>
    );
}