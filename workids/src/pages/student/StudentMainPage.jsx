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

  // 법 항목
  const [lawList, setLawList] = useState([]);

  // 직업 항목
  const [jobKindList, setJobKindList] = useState([]);

  // 나라 정보
  const [nationMainInfo, setNationMainInfo] = useState([]);

  // 총 자산
  const [asset, setAsset] = useState(0);

  // 신용도
  const [creditRating, setCreditRating] = useState(0);

  const token = userData.accessToken;

  useEffect(() => {
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
        getAsset(response.data.data.nationStudentNum);
        getCreditRating(response.data.data.nationStudentNum);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  //법 항목
  useEffect(() => {
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

  //직업 항목
  useEffect(() => {
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
        setJobKindList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  // 나라 정보
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/teacher/nation",
      data: {
        num: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setNationMainInfo(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  // 총 자산
  const getAsset = (nationStudentNum) => {
    console.log("자산 출력 함수입니다");
    axBase(token)({
      method: "post",
      url: "/student/bank/asset",
      data: {
        nationStudentNum: nationStudentNum,
      },
    })
      .then((response) => {
        setAsset(response.data.data.asset);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  // 신용도
  const getCreditRating = (nationStudentNum) => {
    console.log("신용도 출력 함수입니다");
    axBase(token)({
      method: "post",
      url: "/student/bank/credit-rating",
      data: {
        nationStudentNum: nationStudentNum,
      },
    })
      .then((response) => {
        setCreditRating(response.data.data.creditRating);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

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
      className={`m-auto border border-dark border-3 w-50 mx-2 mt-3 text-center rounded-pill px-2 py-1 ${
        isActive(index) ? "bg-warning text-white" : ""
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
              <div className="p-2">
                <button
                  style={{ border: "none", backgroundColor: "transparent", float: "right" }}
                  onClick={navigateToLaw}
                >
                  내 고지서 보러가기&gt;
                </button>
              </div>
              {lawList.map((menu, index) => (
                <div key={index} className="m-1">
                  {menu.content}
                </div>
              ))}
            </div>
          ) : state === 1 ? (
            <div className="margin-left-20 p-2">
              <div className="p-2">
                <button
                  style={{ border: "none", backgroundColor: "transparent", float: "right" }}
                  onClick={navigateToJob}
                >
                  내 직업 보러가기&gt;
                </button>
              </div>
              {jobKindList.map((menu, index) => (
                <div key={index} className="m-1">
                  {menu.name}
                </div>
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
              <div>자산</div>
              <div>
                {asset} {userData.moneyName}
              </div>
            </div>
            <div
              className="w-50 border border-dark  border-3 ms-2 text-center p-1"
              style={borderRound}
            >
              <div>신용도</div>
              <div>{creditRating} 점</div>
            </div>
          </div>
          <div className="border border-dark  border-3  m-1 p-3" style={rightBottomDiv}>
            <div
              style={{
                display: "grid",
                gridTemplateRows: "2fr 1fr 1fr",
                gridTemplateColumns: "1fr 4fr",
                gap: "10px",
              }}
            >
              <div style={{ fontSize: "25px", textAlign: "center", gridColumn: "span 2" }}>
                {userData.nationName} 나라
              </div>
              <div> 화폐명: </div>
              <div> {nationMainInfo.moneyName} </div>
              <div> 세율: </div>
              <div> {nationMainInfo.taxRate} % </div>
              <div> 운영시작일: </div>
              <div> {nationMainInfo.startDate} </div>
              <div> 운영종료일: </div>
              <div> {nationMainInfo.endDate} </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div className="btn" onClick={navigateToConsumption}>
          <div className="border border-dark bg-white border-3 text-center p-3 rounded-pill">
            뭘 봐! 돈 쓰러 오든가 말던가!
          </div>
          <div className="kiki m-auto"></div>
        </div>
        <div className="btn" onClick={navigateToBank}>
          <div className="border border-dark bg-white border-3 text-center p-3  rounded-pill">
            안녕하십니까!! KB 국민은행입니다!!
          </div>
          <div className="ageo m-auto"></div>
        </div>
        <div className="btn" onClick={navigateToAuction}>
          <div className="border border-dark bg-white border-3 text-center p-3 rounded-pill">
            컴온 YO!♪ 여↗긴↘ 부동산임YO!♪
          </div>
          <div className="m-auto lamu"></div>
        </div>
        <div className="btn" onClick={navigateToRanking}>
          <div className="border border-dark bg-white border-3 text-center p-3 rounded-pill">
            여긴... 랭킹..이야...
          </div>{" "}
          <div className="ccoli m-auto"></div>
        </div>
      </div>
    </div>
  );
}
