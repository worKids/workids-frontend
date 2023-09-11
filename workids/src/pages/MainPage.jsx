import React, { useState } from "react";

export default function MainPage() {
  const [userType, setUserType] = useState("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <div className="h-100">
      <h1>{userType}</h1>
      <h1>{id}</h1>
      <h1>{password}</h1>
      <div className="h-75 d-flex justify-content-center align-items-center ">
        <div className="border border-dark  border-3 p-5" style={borderRound}>
          <div className="d-flex justify-content-center">
            <div className="form-check mx-3 my-3">
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
            <div className="form-check mx-3 my-3">
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
          <div className="row mb-2">
            <div>아이디</div>
            <input
              type="text"
              className="form-control"
              placeholder="id"
              aria-label="id"
              onChange={handleUserIdChange}
            />
          </div>
          <div className="row">
            <div>비밀번호</div>
            <input
              type="text"
              className="form-control"
              placeholder="password"
              aria-label="password"
              onChange={handlePasswordChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
