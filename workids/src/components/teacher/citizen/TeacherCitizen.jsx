import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import TeacherCreditRatingUpdate from "./TeacherCreditRatingUpdate";


export default function TeacherCitizen(){
    const citizenMenu = ["국민 조회", "신용도 관리", "이민자 관리", "통계 조회"];
    const [state, setState] = useState(0);//버튼 클릭
    const [userData, setUserData] = useRecoilState(userState);
    const [citizenList, setCitizenList] = useState([]); //국민 항목
    const [creditRatingList, setCreditRatingList] = useState([]); //국민 항목
    const navigate = useNavigate();
    const handleCreditRatingChange = (e, index) => {
        const updatedCreditRatingList = [...creditRatingList];
        updatedCreditRatingList[index].creditRating = e.target.value;
        setCreditRatingList(updatedCreditRatingList);
      };
 
      
    const clickMenu = (idx) => {
        setState(idx);
      };
    

    const divStyle = {
    width: "80%",
    borderRadius: "40px",
    };

    //직업 메뉴의 탭들
    const menu = citizenMenu.map((menu, index) => (
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


     

      
       
 
    

    //국민관리 리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/teacher/citizen/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setCitizenList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

        }, []);

        //신용도 리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/teacher/citizen/credit/list",
            data: {
                nationNum: userData.nationNum,
                
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setCreditRatingList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

        }, []);

         

       

    //국민관리 출력화면
    const citizenItems  = citizenList.map((menu, index) => (
        <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td>{menu.jobName}</td>
            <td>{menu.asset}</td>
            <td>{menu.credit_rating}</td>
    
            <hr></hr>
        </tr>
    ));


    //신용도관리 출력화면
    const creditRatingItems  = creditRatingList.map((menu, index) => (
       
          <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td><input type="number" min={0} max={100} step={1} value={menu.creditRating} onChange={(e) => handleCreditRatingChange(e, index)}></input></td>
            <td>
            <td>
            <TeacherCreditRatingUpdate citizenNumber={menu.citizenNumber} creditRating={menu.creditRating}/>
            </td>
        
            </td>
           
         
        </tr>  
     
    ));
    


    return (
        <div style={divStyle} className="border border-dark  border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                    <div>국민 관리</div>
                </div>
                {state === 0 ? (
                    <div>
                    <table>
                        
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>학급 번호</th>
                                <th style={{ width: '25%' }}>이름</th>
                                <th style={{ width: '25%' }}>직업</th>
                                <th style={{ width: '25%' }}>자산</th>
                                <th style={{ width: '25%' }}>신용도</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {citizenItems}
                        </tbody>
                       

                    </table>
                </div>
                    
                ) : (<div>
                    <table>
                        
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>학급 번호</th>
                                <th style={{ width: '30%' }}>이름</th>
                                <th style={{ width: '30%' }}>신용도</th>
                                <th style={{ width: '30%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {creditRatingItems}
                         
                        </tbody>
                       

                    </table>
                </div>)}
            </div>
    );
}