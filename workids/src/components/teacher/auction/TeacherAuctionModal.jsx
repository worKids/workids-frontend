import React, { useEffect, useState } from "react";
import { axBase } from "../../../apis/axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
export default function TeacherAuctionModal(props) {
  const [search, setSearch] = useState("all");
  const handleUserTypeChange = (event) => {
    setSearch(event.target.value);
  };
  //   useEffect(() => {
  //     console.log(props.state);
  //     const token = userData.accessToken;
  //     axBase(token)({
  //       method: "post",
  //       url: "/teacher/auction/detail",
  //       data: {
  //         auctionNum: props.state,
  //       },
  //     });
  //   }, [search]);
  const data = [
    {
      citizenNum: "22",
      name: "홍길동",
      seatNumber: 11,
      resultPrice: 150,
    },
    {
      citizenNum: "11",
      name: "사길동",
      seatNumber: 8,
      resultPrice: 150,
    },
    {
      citizenNum: "7",
      name: "삼길동",
      seatNumber: 20,
      resultPrice: 150,
    },
  ];
  const auctionList = data.map((menu, index) => (
    <div key={index}>
      <div className="row m-2 text-center p-3 ">
        <div className="col-2">{menu.citizenNum}</div>
        <div className="col-4">{menu.name}</div>
        <div className="col-3">{menu.seatNumber}</div>
        <div className="col-3">{menu.resultPrice}</div>
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
              value="all"
              id="flexRadioDefault1"
              onChange={handleUserTypeChange}
              checked={search === "all"}
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
              value="success"
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
              value="fail"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              미낙찰
            </label>
          </div>
        </div>
        <div className="d-flex align-items-center me-5">단위 : (미소)</div>
      </div>
      <div className="row  m-2 text-center p-3 ">
        <div className="col-2">학급 번호</div>
        <div className="col-4">이름</div>
        <div className="col-3">부동산 번호</div>
        <div className="col-3">낙찰 금액</div>
      </div>
      {auctionList}
    </div>
  );
}
