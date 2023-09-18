import axios from "axios";
import React, { useState } from "react";

export default function StudentJoin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registNumber, setRegistNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
        console.log(id);
        console.log(password);
        console.log(response);
        alert("회원가입이 완료되었습니다.");
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
          <form className="validation-form" noValidate>
            <div className="row justify-content-center">
              <div className="mb-3 col-9 ">
                <label htmlFor="name">아이디</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder=""
                  value={id}
                  onChange={idHandler}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="mb-3 col-9 ">
                <label htmlFor="nickname">비밀번호</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={password}
                  onChange={passwordHandler}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="mb-3 col-9 ">
                <label htmlFor="nickname">이름</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={name}
                  onChange={nameHandler}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="mb-3 col-9 ">
                <label htmlFor="nickname">주민등록번호</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={registNumber}
                  onChange={registerNumberHandler}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="mb-3 col-9 ">
                <label htmlFor="nickname">이메일</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={email}
                  onChange={emailHandler}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="mb-3 col-9 ">
                <label htmlFor="nickname">휴대폰 번호</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
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
          </form>
        </div>
      </div>
    </div>
  );
}
