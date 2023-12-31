import React, { useState } from "react";
import TeacherAuctionSeat from "./TeacherAuctionSeat";
import TeacherAuctionList from "./TeacherAuctionList";

export default function TeacherAuction() {
  const auctionMenu = ["경매 내역", "경매 생성"];
  const [state, setState] = useState(0); // 클릭 여부 파악 위한 useState

  const clickMenu = (idx) => {
    setState(idx);
  };
  // bootstrap은 w-25, 50, 75, 100 만 되므로 width %를 지정해주려면 이렇게 변수를 만들어서
  // style로 넣어줘야함.
  const divStyle = {
    width: "80%",
    height: "80vh",
    borderRadius: "40px",
    backgroundColor: "#FFFEEE",
  };

  // 부동산 페이지의 경매 내역, 경매 생성 버튼을 map으로 만들어주는 것.
  // className 안에 ${state === index ? "bg-warning text-white" : ""}
  // 이 부분이 클릭했을 때 색이 칠해지게 하는 것.
  const menu = auctionMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => clickMenu(index)}
      className={`menu-button ${state === index ? "bg-warning text-white hoverable" : "hoverable"}`}
    >
      {menu}
    </div>
  ));
  // return() 문에 html 형식으로 넣어주어야 함.
  // 위에 지정한 변수를 가져오려면 {}를 사용.
  const updateData = (num) => {
    setState(num);
  };
  return (
    <div style={divStyle} className="border border-dark mt-4 border-3 p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">{menu}</div>
      </div>
      {state === 0 ? (
        <div>
          <TeacherAuctionList />
        </div>
      ) : (
        <div>
          <TeacherAuctionSeat updateData={updateData} />
        </div>
      )}
    </div>
  );
}
