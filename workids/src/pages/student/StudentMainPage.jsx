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
      className={`m-auto border hoverable border-dark border-3 w-50 mx-2 mt-3 text-center rounded-pill px-2 py-1 ${
        isActive(index) ? "bg-warning text-white" : "bg-white"
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
      <div className="d-flex justify-content-between mx-3 mt-0 fs-4" style={mainNav}>
        <div
          className="w-50 border border-dark  border-3 mx-5 my-3 p-1"
          style={{ ...borderRound, backgroundColor: "#FFFEEE" }}
        >
          <div className="d-flex">{nationMap}</div>
          {state === 0 ? (
            <div className="p-2">
              <div
                className="hoverable d-flex justify-content-end"
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={navigateToLaw}
              >
                내 고지서 보러가기 &gt;
              </div>
              <div className="overflow-auto scrollCss" style={{ height: "25vh" }}>
                {lawList.map((menu, index) => (
                  <div key={index} className="mx-4 my-1">
                    {menu.content}
                  </div>
                ))}
              </div>
            </div>
          ) : state === 1 ? (
            <div className="p-2">
              <div
                className="hoverable d-flex justify-content-end"
                style={{ border: "none", backgroundColor: "transparent", float: "right" }}
                onClick={navigateToJob}
              >
                내 직업 보러가기 &gt;
              </div>
              <div className="overflow-auto scrollCss" style={{ height: "25vh" }}>
                {jobKindList.map((menu, index) => (
                  <div key={index} className="mx-4 m-1">
                    {menu.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-50 my-3 mx-5">
          <div className="d-flex" style={rightDivStyle}>
            <div
              className="w-50 border border-dark  border-3 me-2 text-center p-1"
              style={{ ...borderRound, backgroundColor: "#FFFEEE" }}
            >
              <div>자산</div>
              <div>
                {asset} {userData.moneyName}
              </div>
            </div>
            <div
              className="w-50 border border-dark  border-3 ms-2 text-center p-1"
              style={{ ...borderRound, backgroundColor: "#FFFEEE" }}
            >
              <div>신용도</div>
              <div>{creditRating} 점</div>
            </div>
          </div>
          <div
            className="border border-dark  border-3 mt-3 m-1 p-1"
            style={{ ...rightBottomDiv, backgroundColor: "#FFFEEE" }}
          >
            <div>
              <div className="text-center fs-3">{userData.nationName} 나라</div>
              <div className="d-flex justify-content-around mt-2">
                <div>대통령 : {nationMainInfo.presidentName}</div>
                <div>국민 수 : {nationMainInfo.totalCitizen} 명</div>
              </div>
              <div className="d-flex justify-content-around my-1">
                <div> 화폐 명: {nationMainInfo.moneyName} </div>
                <div>세율 : {nationMainInfo.taxRate}%</div>
              </div>
              <div className="d-flex justify-content-around">
                <div> 운영시작일 : {nationMainInfo.startDate}</div>
                <div></div>
              </div>
              <div className="d-flex justify-content-around my-1">
                <div> 운영종료일 : {nationMainInfo.endDate}</div>
                <div></div>
              </div>
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
          <div
            className="border border-dark bg-white
           border-3 text-center p-3 rounded-pill"
          >
            여긴... 랭킹..이야...
          </div>{" "}
          <div className="ccoli m-auto"></div>
        </div>
      </div>
    </div>
  );
}
