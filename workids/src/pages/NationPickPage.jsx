import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import TeacherTopNav from "../components/teacher/TeacherTopNav";
import StudentTopNav from "../components/student/StudentTopNav";
import { axBase } from "../apis/axiosInstance";

export default function NationPickPage() {
  const [userData, setUserData] = useRecoilState(userState);
  const [nationList, setNationList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    if (userData.userType === "teacher") {
      axBase(token)({
        method: "post",
        url: "/teacher/nation/list",
        data: {
          num: userData.userNumber,
          //name: userData.name,
          //totalStudent: userData.totalStudent
        },
      })
        .then((response) => {
          console.log(response.data.data);
          setNationList(response.data.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      axBase(token)({
        method: "post",
        url: "/student/nation/list",
        data: {
          num: userData.userNumber,
        },
      })
        .then((response) => {
          console.log(response.data.data);
          setNationList(response.data.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }, []);
  const borderRound = {
    borderRadius: "40px",
  };

  const navigateToCreate = () => {
    navigate("/nation/create");
  };
  const navigateToNation = (index) => {
    const updateUserData = {
      ...userData,
      nationName: nationList[index].name,
      nationNum: nationList[index].nationNum,
      totalStudent: nationList[index].totalStudent,
    };
    setUserData(updateUserData);
    console.log(userData);
    if (userData.userType === "teacher") {
      navigate("/teacher/nation/main");
    } else {
      navigate("/student/nation");
    }
  };
  const nationBtn =
    nationList !== null ? (
      nationList.map((menu, index) => (
        <div
          key={index}
          className={`m-3 border border-dark  border-3 text-center p-3 bg-white rounded-pill sideNav `}
          onClick={() => navigateToNation(index)}
        >
          {menu.name}
        </div>
      ))
    ) : (
      <div>나라를 생성해주세요</div>
    );
  return (
    <div>
      {userData.userType === "teacher" ? (
        <div>
          <TeacherTopNav />
          <div className="border border-dark  border-3 m-4 p-3 bg-warning" style={borderRound}>
            <div className="d-flex justify-content-between">
              <h4 className="ms-3 ">운영중인 나라</h4>
              <div className="me-4" onClick={navigateToCreate}>
                <div style={{ fontSize: "20px" }}>나라 설립하기 &gt;</div>
              </div>
            </div>
            {nationBtn}
          </div>
        </div>
      ) : (
        <div>
          <StudentTopNav />
          <div className="border border-dark  border-3 m-4 p-3 bg-warning" style={borderRound}>
            <h4 className="ms-3">운영중인 나라</h4>
            {nationBtn}
          </div>
        </div>
      )}
    </div>
  );
}
