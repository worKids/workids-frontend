import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import StudentTopNav from "../../components/student/StudentTopNav";
import { axBase } from "../../apis/axiosInstance";
import { useLocation } from 'react-router-dom';

export default function NationPickPage() {
  const [userData, setUserData] = useRecoilState(userState);
  const [nationList, setNationList] = useState([]);
  const navigate = useNavigate();


  const borderRound = {
    borderRadius: "40px",
  };

  const navigateToCreate = () => {
    navigate("/nation/create");
  };

  const location = useLocation();
  const { code } = location.state || {}; // 데이터 읽기

  return (
    <div>
    <TeacherTopNav />
    <div className="border border-dark  border-3 m-5 p-5 bg-warning" style={borderRound}> 
        <h3 className="ms-3 ">나라 설립을 환영합니다!</h3><br/>
        <h3 className="ms-3 ">참여코드:{code} </h3><br/>

        <h3 className="ms-3 ">참여 가능한 국민 목록을 설정하고</h3><br/>
        <h3 className="ms-3 ">참여코드를 통해 국민을 초대해보세요!</h3><br/>
        <h3 className="ms-3 ">(국민 목록 설정과 참여코드는 나라 운영에서 확인 가능합니다.)</h3><br/> 

          
    </div>
  </div>

  );
}

 
 