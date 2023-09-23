import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentJobList({ citizenNumber }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const [myJobList, setMyJobList] = useState([]); //직업 항목
  const divListStyle = {
    borderRadius: "20px",
    backgroundColor: "#FEE173",
    border: "solid 5px #F6BE2C"
  }

  const heightStyle = {
    height: "85%",
    borderRadius: "40px",
    backgroundColor: '#FFFEEE',
  };
  const divStyle = {
    width: "80%",
    borderRadius: "40px",
    backgroundColor: "#ffc107"
  };
  const hrStyle = {
    width: "100%",
    height: "5px",
    backgroundColor: "black",
    margin : "5px"
  }

  //내 직업 출력
  const MyJobItems = myJobList.map((menu, index) => (
    <div className="row justify-content-md-center p-1" style={{ fontSize: "25px", textAlign: "center" }}>
      <div className="col-2">{index + 1}</div>
      <div className="col-2">{menu.name}</div>
      <div className="col-2">{menu.salary}</div>
      <div className="col-2">{menu.createDate}</div>
      <div className="col-2">{menu.updateDate}</div>
      <div><hr></hr></div>
    </div>
  ));




  //내 직업리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/student/job/my/list",
      data: {
        nationNum: userData.nationNum,
        nationStudentNum: userData.nationStudentNum
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setMyJobList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);


  return (
    <div>

<div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
<div className="border border-dark  border-3 p-3" style={heightStyle}>
<div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
         
          <div className="col-2">No.</div>
          <div className="col-2">직업</div>
          <div className="col-2">월급</div>
          <div className="col-2">시작일</div>
          <div className="col-2">종료일</div>
          </div>
          <div style={hrStyle}></div>
          <div className="scrollCss" style={{overflowX:'hidden', overflowY:'auto', height:'55vh'}}>
                {MyJobItems}
              </div>
        </div>

      </div>
      
  );
}


