import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentRecentAuction() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [auctionNum, setAuctionNum] = useState("");
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [seats, setSeats] = useState([]);
  const [createDate, setCreateDate] = useState("");
  const [totalseat, setTotalSeat] = useState("");
  const [selectSeat, setSelectSeat] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/student/auction/detail",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setAuctionNum(response.data.data.auctionNum);
        setRows(response.data.data.classRow);
        setCols(response.data.data.classColumn);
        setCreateDate(response.data.data.createdDate);
        setTotalSeat(response.data.data.totalSeat);
        console.log(userData);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  useEffect(() => {
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
  }, [totalseat]);

  const pickSeat = (seat) => {
    if (seat !== " ") {
      setSelectSeat(seat);
    }
  };
  const creatBid = () => {
    if (selectSeat === "") {
      alert("자리를 선택해주세요.");
      return;
    }
    if (price === "") {
      alert("금액을 입력해주세요.");
      return;
    }
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "patch",
      url: "/student/auction/",
      data: {
        auctionNum: auctionNum,
        nationStudentNum: userData.nationStudentNum,
        submitSeat: selectSeat,
        submitPrice: price,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        alert("입찰이 완료되었습니다.");
        navigate("/student/auction");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const divStyle = {
    borderRadius: "40px",
  };
  return (
    <div className="fs-5">
      <h4 className="mx-3">{createDate} 경매</h4>
      {auctionNum === "" ? (
        <div>최근 경매가 존재하지 않습니다.</div>
      ) : (
        <div>
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
                      className={`btn d-flex w-25 justify-content-center mx-3 mt-1  fs-5 border border-dark ${
                        selectSeat === seat
                          ? "bg-warning text-white"
                          : selectSeat === ""
                          ? "readOnly"
                          : ""
                      }`}
                      onClick={() => pickSeat(seat)}
                    >
                      {seat}{" "}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="w-75 m-auto border border-dark  border-3 mt-5" style={divStyle}>
            <div className="my-3">
              <div className="d-flex justify-content-center">
                <div className="mx-2">부동산 번호 :</div>
                <input
                  type="number"
                  className="text-center"
                  value={selectSeat}
                  onChange={(e) => setSelectSeat(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <div className="mx-3">입찰 금액 :</div>
                <input
                  type="number"
                  className="text-center"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button style={divStyle} onClick={creatBid}>
                입찰하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
