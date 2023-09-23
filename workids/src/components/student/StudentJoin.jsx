import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentJoin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registNumber, setRegistNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const idHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const nameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const registerNumberHandler = (event) => {
    setRegistNumber(event.currentTarget.value);
  };
  const emailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const phoneHandler = (event) => {
    setPhone(event.currentTarget.value);
  };

  const join = () => {
    axios
      .post("http://localhost:8070/student/account/join", {
        id: id,
        password: password,
        name: name,
        email: email,
        phone: phone,
        registNumber: registNumber,
      })
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
        console.log(id);
        console.log(password);
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div>
      <div className="input-form-backgroud row ">
        <div className="input-form col-md-12 mx-auto">
          <div className="row justify-content-center">
            <div className="mb-3 col-9 ">
              <label htmlFor="name">아이디</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="id"
                value={id}
                onChange={idHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="mb-3 col-9 ">
              <label htmlFor="nickname">비밀번호</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={passwordHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="mb-3 col-9 ">
              <label>이름</label>
              <input
                type="text"
                className="form-control"
                placeholder="ex) 홍길동"
                value={name}
                onChange={nameHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="mb-3 col-9 ">
              <label>주민등록번호</label>
              <input
                type="text"
                className="form-control"
                placeholder="101111-3111111"
                value={registNumber}
                onChange={registerNumberHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="mb-3 col-9 ">
              <label>이메일</label>
              <input
                type="email"
                className="form-control"
                placeholder="gildong@naver.com"
                value={email}
                onChange={emailHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="mb-3 col-9 ">
              <label>휴대폰 번호</label>
              <input
                type="text"
                className="form-control"
                placeholder="ex) 010-0000-0000"
                value={phone}
                onChange={phoneHandler}
              />
            </div>
          </div>
          <div className="row justify-content-center my-3">
            <button
              className="col-9 btn btn-warning btn-lg btn-block text-white"
              type="submit"
              onClick={join}
            >
              가입 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
