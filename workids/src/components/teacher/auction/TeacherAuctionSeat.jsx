import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AuctionSeat({ updateData }) {
  const userData = useRecoilValue(userState);
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [seats, setSeats] = useState([]);
  const [date, setDate] = useState(new Date());
  const [totalseat, setTotalSeat] = useState("");
  const navigate = useNavigate();
  const createAuction = () => {
    const token = userData.accessToken;

    const auctionData = {
      nationNum: userData.nationNum,
      teacherNum: userData.userNumber,
      classRow: rows,
      classColumn: cols,
      totalSeat: totalseat,
    };
    axBase(token)({
      method: "post",
      url: "/teacher/auction",
      data: auctionData,
    })
      .then((response) => {
        console.log(response.data.data);
        alert("경매 생성");
        goToList();
        navigate("/teacher/auction");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const goToList = () => {
    updateData(0);
  };

  const generateSeat = () => {
    if (!rows) {
      alert("행을 입력하세요");
      return;
    }
    if (!cols) {
      alert("열을 입력하세요");
      return;
    }
    if (!totalseat) {
      alert("자리 수를 입력하세요");
      return;
    }
    const generatedSeats = [];
    let seatNum = 1;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (seatNum <= totalseat) {
          row.push(seatNum);
          seatNum += 1;
        } else row.push(" ");
      }
      generatedSeats.push(row);
    }

    setSeats(generatedSeats);
  };
  const divStyle = {
    borderRadius: "40px",
  };
  const widthStyle = {
    width: "10%",
  };
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  return (
    <div className="mt-3">
      <div className="border border-dark  border-3" style={divStyle}>
        <div className="text-center w-50 border m-auto" style={{ backgroundColor: "#D9D9D9" }}>
          칠판(정면)
        </div>
        <div className="m-3">
          <br />
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="d-flex justify-content-around">
              {row.map((seat, colIndex) => (
                <div
                  key={colIndex}
                  className="d-flex w-25 justify-content-center mx-3 mt-1 border border-dark"
                >
                  {seat}{" "}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-75 m-auto border border-dark  border-3 mt-3" style={divStyle}>
        <div className="d-flex justify-content-center my-3">
          <label>경매 오픈 날짜 :</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy-MM-dd"
            selectsStart
            minDate={new Date()}
            className="datePicker mx-2"
            placeholderText={formatDate(new Date())}
          />
        </div>
        <div className="d-flex m-3 justify-content-center">
          <label>행 :</label>
          <input
            className="mx-2 "
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            style={widthStyle}
          />

          <label>열 :</label>
          <input
            className="mx-2 "
            value={cols}
            onChange={(e) => setCols(e.target.value)}
            style={widthStyle}
          />

          <label>자리 수 :</label>
          <input
            className="mx-2 "
            value={totalseat}
            onChange={(e) => setTotalSeat(e.target.value)}
            style={widthStyle}
          />

          <button onClick={generateSeat} style={divStyle}>
            생성
          </button>
        </div>
        <div className="d-flex justify-content-center my-3">
          <button style={divStyle} onClick={createAuction}>
            경매 생성하기
          </button>
        </div>
      </div>
    </div>
  );
}
