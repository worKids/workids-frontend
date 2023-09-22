import React, { useEffect, useState } from "react";
import { axBase } from "../../../apis/axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
export default function TeacherAuctionModal(props) {
  const userData = useRecoilValue(userState);
  const [search, setSearch] = useState("3");
  const [detail, setDetail] = useState([]);
  const handleUserTypeChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    console.log(props.state);
    const token = userData.accessToken;
    axBase(token)({
      method: "post",
      url: "/teacher/auction/detail",
      data: {
        auctionNum: props.state,
        auctionState: search,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setDetail(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }, [search]);
  const auctionList = detail.map((menu, index) => (
    <div key={index}>
      <div
        className={`row m-2 text-center p-3 `}
        style={{ backgroundColor: index % 2 === 0 ? "#FFFEEE" : "white" }}
      >
        <div className="col-2">{menu.citizenNum}</div>
        <div className="col-4">{menu.name}</div>
        <div className="col-2">
          {menu.state === 0 ? (
            <div>미참여</div>
          ) : menu.state === 1 ? (
            <div>낙찰</div>
          ) : menu.state === 2 ? (
            <div>미낙찰</div>
          ) : null}
        </div>
        <div className="col-2">{menu.seatNumber}</div>
        <div className="col-2">{menu.resultPrice}</div>
      </div>
    </div>
  ));
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="form-check mx-5 my-3">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value="3"
              id="flexRadioDefault1"
              onChange={handleUserTypeChange}
              checked={search === "3"}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              전체
            </label>
          </div>
          <div className="form-check mx-5 my-3">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value="1"
              id="flexRadioDefault1"
              onChange={handleUserTypeChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              낙찰
            </label>
          </div>
          <div className="form-check mx-5 my-3">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onChange={handleUserTypeChange}
              value="2"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              미낙찰
            </label>
          </div>
        </div>
        <div className="d-flex align-items-center me-5">단위 : ({userData.moneyName})</div>
      </div>
      <div className="row  m-2 text-center p-3 ">
        <div className="col-2">학급 번호</div>
        <div className="col-4">이름</div>
        <div className="col-2">타입</div>
        <div className="col-2">부동산 번호</div>
        <div className="col-2">낙찰 금액</div>
      </div>
      <div className="container overflow-auto" style={{ maxHeight: "35vh" }}>
        {auctionList}
      </div>
    </div>
  );
}
