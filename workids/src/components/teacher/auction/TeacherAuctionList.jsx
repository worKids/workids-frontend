import React from "react";

export default function TeacherAuctionList() {
  const data = [
    {
      date: "2023-07-30",
      state: 0,
      auctionNum: 1,
    },
    {
      date: "2023-07-30",
      state: 1,
      auctionNum: 1,
    },
    {
      date: "2023-07-30",
      state: 2,
      auctionNum: 1,
    },
  ];

  const auctionList = data.map((menu, index) => (
    <div key={index}>
      <div className="row m-2 text-center p-3 ">
        <div className="col-2">{index + 1}</div>
        <div className="col-6">{menu.date}</div>
        <div className="col-2">{menu.state === 0 ? (<div>
            종료하기
        </div>): (<div>
            {menu.state === 1 ? (<div>경매 종료</div>) : (<div>취소됨</div>)}
        </div>)}</div>
        <div className="col-2">낙찰 내역 조회</div>
      </div>
      <tr />
    </div>
  ));
  return (
    <div>
      <div>
        <div className="row  m-2 text-center p-3 ">
          <div className="col-2">번호</div>
          <div className="col-6">경매 날짜</div>
          <div className="col-2">경매 상태</div>
          <div className="col-2">낙찰 내역 조회</div>
        </div>
        {auctionList}
      </div>
    </div>
  );
}
