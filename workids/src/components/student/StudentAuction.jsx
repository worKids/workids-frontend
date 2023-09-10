import React from "react";

export default function StudentAuction(props) {
  const divStyle = {
    width: "80%",
    borderRadius: "40px",
  };
  return (
    <div className="border border-dark  border-3 p-5" style={divStyle}>
      {props.state === 0 ? (
        <div>
          <h1>{props.state}</h1>
        </div>
      ) : (
        <div>
          <h1>{props.state}</h1>
        </div>
      )}
    </div>
  );
}
