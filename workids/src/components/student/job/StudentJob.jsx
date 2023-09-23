import React from "react";
import StudentJobList from "./StudentJobList";
import StudentMyJobList from "./StudentMyJobList";

export default function StudentAuction(props) {
 
  const heightStyle = {
    height: "100%",
    borderRadius: "40px",
  };

  const divListStyle = {
    borderRadius: "20px",
    backgroundColor: "#FEE173",
    border: "solid 5px #F6BE2C"
}
const divStyle = {
  width: "80%",
  borderRadius: "40px",
  backgroundColor: "#ffc107"
};

  return (
    <div className="border border-dark  border-3 p-3 h-100" style={divStyle}>

      {props.state === 0 ? (

        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">전체 직업 조회하기</div>
          
          
       
            <StudentJobList />
      
        </div>
      ) : (
        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">내 직업 조회하기 </div>
         
            <StudentMyJobList />
         
        </div>
      )}
    </div>
  );
}
