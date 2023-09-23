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
 
  return (
    <div>
    <StudentTopNav />
    <div className="border border-dark  border-3 m-5 p-5 " style={{...borderRound, backgroundColor: "#FFFEEE" }}> 
        <div className="row fs-4 p-2 justify-content-center" >
          <div className="col-2">참여코드: </div>
          <div className="col-3">
            <input
                type="text"
                value={participationCode}
                onChange={handleChangeParticipationCode}
              /> 
            </div>
        </div>

        <div className="row fs-4 p-3 justify-content-center">
          <div className="col-2"> 학급번호: </div>
          <div className="col-3">
            <input
              type="number"
              value={citizenNumber}
              onChange={handleChangeCitizensNumber}
            /> 
          </div>
        </div>  
 
      {/* 버튼 1 */}
      <button className="create-button px-3 py-1" style={{marginTop:"3vh"}} onClick={checkCitizen}>참여 가능 여부 확인</button>
 
          
    </div>
  </div>

  );
}
 

 
 