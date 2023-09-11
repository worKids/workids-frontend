import React from "react";

export default function StudentAuction(props) {
  const divStyle = {
    width: "80%",
    borderRadius: "40px",
  };
  const heightStyle = {
    height: "85%",
    borderRadius: "40px",
  };
  
  return (
    <div className="border border-dark  border-3 p-3 h-100" style={divStyle}>
      {props.state === 0 ? (
        <div className="h-100">
          <div className="mx-3 mt-2 mb-4 fs-3">진행중인 경매</div>
          <div className="border border-dark  border-3 p-5" style={heightStyle}>
            <h1>{props.state}</h1>
          </div>
        </div>
      ) : (
        <div className="h-100">
          <div className="mx-3 mt-2 mb-4 fs-3">경매 내역 보기</div>
          <div className="border border-dark  border-3 p-5" style={heightStyle}>
            <h1>{props.state}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
