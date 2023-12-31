import React from "react";
import StudentStatistic from "./StudentStatistic";
import StudentRanking from "./StudentRanking";

export default function StudentRank(props) {
  const divStyle = {
    width: "80%",
    borderRadius: "40px",
  };
  const heightStyle = {
    height: "100%",
    borderRadius: "40px",
  };

  return (
    <div
      className="border border-dark  border-3 p-3 h-100"
      style={{ ...divStyle, backgroundColor: "#ffc107" }}
    >
      {props.state === 0 ? (
        <div className="h-100">
          <div
            className="border border-dark  border-3 p-4"
            style={{ ...heightStyle, backgroundColor: "#FFFEEE" }}
          >
            <StudentRanking />
          </div>
        </div>
      ) : (
        <div className="h-100">
          <div
            className="border border-dark  border-3 p-3"
            style={{ ...heightStyle, backgroundColor: "#FFFEEE" }}
          >
            <StudentStatistic />
          </div>
        </div>
      )}
    </div>
  );
}
