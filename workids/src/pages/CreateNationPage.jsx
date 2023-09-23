import React, { useState } from "react";
import { useRecoilValue, useRecoilState} from "recoil"; 
import { userState } from "../recoil/userAtoms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePick.css";
import { axBase } from "../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
export default function CreateNationPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState); 
  const [name, setName] = useState("");
  const [moneyName, setmoneyName] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [payDay, setpayDay] = useState("선택");
  const [balance, setBalance] = useState("");
  const [school, setschool] = useState("");
  const [grade, setgrade] = useState("");
  const [classRoom, setclassRoom] = useState("");
  const [code, setCode] = useState("");

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  const numberOptions = [];

  for (let i = 1; i <= 28; i++) {
    numberOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const nameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const moneyNameHandler = (event) => {
    setmoneyName(event.currentTarget.value);
  };
  const taxRateHandler = (event) => {
    setTaxRate(event.currentTarget.value);
  };
  const payDayHandler = (event) => {
    setpayDay(event.currentTarget.value);
  };
  const balanceHandler = (event) => {
    setBalance(event.currentTarget.value);
  };
  const schoolHandler = (event) => {
    setschool(event.currentTarget.value);
  };
  const gradeHandler = (event) => {
    setgrade(event.currentTarget.value);
  };
  const classRoomHandler = (event) => {
    setclassRoom(event.currentTarget.value);
  };

  const create = () => {
    const token = userData.accessToken;
    if (!token) {
      return;
    } 
    const nationData = {
      teacherNum: userData.userNumber,
      name: name,
      moneyName: moneyName,
      taxRate: taxRate,
      presidentName: userData.userName,
      payDay: payDay,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      school: school,
      grade: grade,
      classRoom: classRoom,
      balance: balance,
    };
    axBase(token)({
      method: "post",
      url: "/teacher/nation/join",
      data: nationData,
    })
      .then((response) => {
        console.log(response.data.data);
        console.log("data",response.data.data); 
        const updateNationData = {
          ...userData, 
          nationNum: response.data.data.nationNum,
          nationName: response.data.data.name, 
          code: response.data.data.code,
          moneyName: response.data.data.moneyName,
        }; 
        setUserData(updateNationData)


        navigate("/teacher/nationCreate", {
          state: {
            code: response.data.data.code,
          },
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        
      });

    console.log(nationData);
  };

  return (
    <div className="container">
      <div>
        <h3 className="d-flex justify-content-center p-4">나라 설립하기</h3>

        <div className="row justify-content-center">
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              나라명
            </div>
            <input
              type="text"
              className="form-control bg-white border-2 border-dark"
              id="name"
              placeholder="ex) 삼다수"
              value={name}
              onChange={nameHandler}
            />
          </div>
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              화폐 명
            </div>
            <input
              type="text"
              className="form-control bg-white border-2 border-dark"
              id="name"
              placeholder="ex) 미소"
              value={moneyName}
              onChange={moneyNameHandler}
            />
          </div>
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              세율 (%)
            </div>
            <input
              type="number"
              className="form-control border bg-white border-2 border-dark"
              id="name"
              placeholder="ex) 20%"
              value={taxRate}
              onChange={taxRateHandler}
            />
          </div>
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              운영 기간
            </div>
            <div className="d-flex m-auto">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                selectsStart
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                className="datePicker bg-white border-2 border-dark"
                placeholderText={formatDate(new Date())}
              />
              <DatePicker
                selected={endDate}
                onChange={(data) => setEndDate(data)}
                dateFormat="yyyy-MM-dd"
                selectsEnd
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                className="datePicker1 bg-white border-2 border-dark"
                placeholderText={formatDate(new Date())}
              />
            </div>
          </div>
          <div className="mb-4 col-7 d-flex justify-content-between">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              월급 지급일
            </div>
            <div className="col-2 d-flex justify-content-center">
              <select
                className="form-select scrollCss bg-white border-2 border-dark"
                aria-label="select example"
                value={payDay}
                onChange={payDayHandler}
              >
                <option>선택</option>
                {numberOptions}
              </select>
            </div>
            <div></div>
          </div>
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              초기 지원금
            </div>
            <input
              type="number"
              className="form-control bg-white border-2 border-dark"
              id="name"
              placeholder="ex) 100미소"
              value={balance}
              onChange={balanceHandler}
            />
          </div>
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              학교 명
            </div>
            <input
              type="text"
              className="form-control bg-white border-2 border-dark"
              id="name"
              placeholder="ex) OO초"
              value={school}
              onChange={schoolHandler}
            />
          </div>
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              학년
            </div>
            <input
              type="number"
              className="form-control bg-white border-2 border-dark"
              id="name"
              placeholder="ex) 5학년"
              value={grade}
              onChange={gradeHandler}
            />
          </div>
          <div className="mb-4 col-7 d-flex">
            <div htmlFor="name" className="col-2 d-flex align-items-center">
              반
            </div>
            <input
              type="number"
              className="form-control bg-white border-2 border-dark"
              id="name"
              placeholder="ex) 3반"
              value={classRoom}
              onChange={classRoomHandler}
            />
          </div>
        </div>

        <div className="row justify-content-center my-3">
          <button
            className="col-7 btn btn-warning border-2 border-warning btn-lg btn-block text-white"
            type="submit"
            onClick={create}
          >
            가입 완료
          </button>
        </div>
      </div>
    </div>
  );
}
