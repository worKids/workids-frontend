import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import "./datePick.css";
export default function MainPage() {
  const [userType, setUserType] = useState("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setuserData] = useRecoilState(userState);
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleUserIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const borderRound = {
    borderRadius: "40px",
    
  
  };
  const submitBtn = {
    borderRadius: "15px",
    backgroundColor: "#FED338",
    color: "white",
  };
  const joinBtn = {
    borderRadius: "5px",
    backgroundColor: "#FED338",
    color: "white",
    width: "fit-content",
    right: "0",
  };

  const inputColor = {
    backgroundColor: "#EEEEEE",
  };

  const login = () => {
    if (!id) {
      alert("id를 입력해주세요.");
      return;
    }
    if (userType === "teacher") {
      console.log("login");
      axios
        .post("http://localhost:8070/teacher/account/login", {
          id: id,
          password: password,
        })
        .then((response) => {
          const state = {
            accessToken: response.data.accessToken,
            userNumber: response.data.userNum,
            userName: response.data.userName,
            id: id,
            password: password,
            userType: userType,
          };
          setuserData(state);
          console.log(userData);
          navigate("/select");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      axios
        .post("http://localhost:8070/student/account/login", {
          id: id,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          const state = {
            accessToken: response.data.accessToken,
            userNumber: response.data.userNum,
            userName: response.data.userName,
            id: id,
            password: password,
            userType: userType,
          };
          setuserData(state);
          console.log(userData);
          navigate("/select");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
    console.log(userData);
  };

  const navigate = useNavigate();
  const navigateToJoin = () => {
    navigate("/join");
  };

  return (
    <div className="h-100 w-100">
      <div className="mainLogo w-50 m-auto"></div>
      <div className="h-75 d-flex justify-content-center align-items-center">
        <div className="border border-dark border-4 px-5 py-4 mb-5" style={{...borderRound, backgroundColor:"#FFFDDD"}}>
          <h3 className="d-flex justify-content-center">로그인</h3>
          <div className="d-flex justify-content-center">
            <div className="form-check mx-5 my-3">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                value="teacher"
                id="flexRadioDefault1"
                onChange={handleUserTypeChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                선생님
              </label>
            </div>
            <div className="form-check mx-5 my-3">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={handleUserTypeChange}
                value="student"
                checked={userType === "student"}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                학생
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="row mb-2">
                <div>아이디</div>
                <input
                  type="text"
                  className="form-control bg-white border-2 border-dark"
                  placeholder="id"
                  aria-label="id"
                  onChange={handleUserIdChange}
                  style={inputColor}
                />
              </div>
              <div className="row">
                <div>비밀번호</div>
                <input
                  type="text"
                  className="form-control bg-white border-2 border-dark"
                  placeholder="password"
                  aria-label="password"
                  onChange={handlePasswordChange}
                  style={inputColor}

                />
              </div>
            </div>
            <div
              className="btn col-3 d-flex justify-content-center align-items-center border border-warning  border-2 ms-3 mt-4"
              style={submitBtn}
              onClick={login}
            >
              로그인
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div
              className="btn mt-3 px-4  d-flex justify-content-end text-center border border-warning border-2 "
              style={joinBtn}
              onClick={navigateToJoin}
            >
              회원가입
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
