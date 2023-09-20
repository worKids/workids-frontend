import React, { useEffect, useState } from "react";
import StudentTopNav from "../../components/student/StudentTopNav";
import "./student.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { axBase } from "../../apis/axiosInstance";
import { userState } from "../../recoil/userAtoms";
export default function StudentMainPage() {
  const [userData, setUserData] = useRecoilState(userState);
  const [state, setState] = useState(0);
  const [lawList, setLawList] = useState([]); //법 항목
  const [jobList, setJobList] = useState([]); //직업 항목
  const [jobMyList, setMyJobList] = useState([]); //직업 항목



  

  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/nation/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/student/nation",
      data: {
        nationNum: userData.nationNum,
        studentNum: userData.userNumber,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        const updateUserData = {
          ...userData,
          nationStudentNum: response.data.data.nationStudentNum,
        };
        setUserData(updateUserData);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

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

  }, []);
  //직업 항목 리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/student/job/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setJobList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);

  //내 직업 리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/student/job/my/list",
      data: {
        nationNum: userData.nationNum,
        nationStudentNum: userData.nationStudentNum
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setMyJobList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);

  const isActive = (index) => {
    if (state === index) {
      return true;
    }
    return false;
  };
  const nationData = [`${userData.nationName}의 법`, `${userData.nationName}의 직업`];

  const nationMap = nationData.map((data, index) => (
    <div
      key={index}
      onClick={() => setState(index)}
      className={`m-auto border border-dark border-3 w-50 mx-2 mt-3 text-center rounded-pill px-2 py-1 ${isActive(index) ? "bg-warning text-white" : ""
        }`}
    >
      {data}
    </div>
  ));
  const rightDivStyle = {
    height: "30%",
  };

  const rightBottomDiv = {
    height: "65%",
    borderRadius: "40px",
  };
  const mainNav = {
    height: "45%",
  };

  const borderRound = {
    borderRadius: "40px",
  };
  const navigate = useNavigate();
  const navigateToConsumption = () => {
    navigate("/student/consumption");
  };
  const navigateToBank = () => {
    navigate("/student/bank");
  };
  const navigateToAuction = () => {
    navigate("/student/auction");
  };
  const navigateToRanking = () => {
    navigate("/student/ranking");
  };
  const navigateToLaw = () => {
    navigate("/student/law");
  };

  const navigateToJob = () => {
    navigate("/student/job");
  };


  

  return (
    <div className="h-100">
      <StudentTopNav />
      <div className="d-flex justify-content-between m-3" style={mainNav}>
        <div className="w-50 border border-dark  border-3 mx-5 my-3 p-1" style={borderRound}>
          <div className="d-flex">{nationMap}</div>
          {state === 0 ? (
            <div className="margin-left-20 p-2">
              <div className="p-2"><button style={{ border: 'none', backgroundColor: 'transparent', float: 'right' }} onClick={navigateToLaw}>내 고지서 보러가기&gt;</button></div>
              {lawList.map((menu, index) => (
                <div className="m-1">{menu.content}</div>
              ))}
            </div>
          ) : state === 1 ? (
            <div className="margin-left-20 p-2">
              <div className="p-2"><button style={{ border: 'none', backgroundColor: 'transparent', float: 'right' }} onClick={navigateToJob}>내 직업 보러가기&gt;</button></div>
              {jobList.map((menu, index) => (
                <div className="m-1">{menu.name}</div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="w-50 my-3 mx-5">
          <div className="d-flex" style={rightDivStyle}>
            <div
              className="w-50 border border-dark  border-3 me-2 text-center p-1"
              style={borderRound}
            >
              자산
            </div>
            <div
              className="w-50 border border-dark  border-3 ms-2 text-center p-1"
              style={borderRound}
            >
              신용도
            </div>
          </div>
          <div className="border border-dark  border-3  m-1 p-3" style={rightBottomDiv}>
      
          

 

          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div className="btn" onClick={navigateToConsumption}>
          <div className="text-center">돈 쓰러가기(소비항목)</div>
          <div className="kiki"></div>
        </div>
        <div className="btn" onClick={navigateToBank}>
          <div className="text-center">은행으로 가기</div>
          <div className="ageo"></div>
        </div>
        <div className="btn" onClick={navigateToAuction}>
          <div className="text-center">부동산 정보 보기</div>
          <div className="lamu"></div>
        </div>
        <div className="btn" onClick={navigateToRanking}>
          <div className="text-center">통계 보기</div>
          <div className="ccoli"></div>
        </div>
      </div>
    </div>
  );
}
