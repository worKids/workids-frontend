import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import StudentTopNav from "../../components/student/StudentTopNav";
import { axBase } from "../../apis/axiosInstance";
import { useLocation } from 'react-router-dom';

export default function StudentNationJoinPage() {
  const [userData, setUserData] = useRecoilState(userState);
  const [nationList, setNationList] = useState([]);
  const navigate = useNavigate();
  const [participationCode, setParticipationCode] = useState(""); // 참여코드 상태
  const [citizenNumber, setCitizenNumber] = useState(""); // 학급번호 상태



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

  // 참가 가능 여부 확인
  const checkCitizen = () => {
    console.log(userData.userNumber);
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/student/nation/join",
      data: {
          studentNum: userData.userNumber, 
          code: participationCode,
          citizenNumber: citizenNumber,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      alert("나라에 가입하였습니다.");
      navigate("/select");

    })
    .catch((err) => {
        alert(err.response.data.message);
    })
  };
 
 
  const handleChangeParticipationCode = (e) => {
    setParticipationCode(e.target.value);
  };

  const handleChangeCitizensNumber = (e) => {
    setCitizenNumber(e.target.value);
  };
 

  const location = useLocation(); 
 
  return (
    <div>
    <StudentTopNav />
    <div className="border border-dark  border-3 m-5 p-5 bg-warning" style={borderRound}> 
         
        <div className="ms-3 ">참여코드:         
          <input
              type="text"
              value={participationCode}
              onChange={handleChangeParticipationCode}
            /> 
        </div><br/>

        <div className="ms-3 "> 학급번호:            
            <input
              type="text"
              value={citizenNumber}
              onChange={handleChangeCitizensNumber}
            /> 
          </div><br/>
 
      {/* 버튼 1 */}
      <button className="btn btn-primary" onClick={checkCitizen} style={btn}>참여 가능 여부 확인</button>
 
          
    </div>
  </div>

  );
}
 

 
 