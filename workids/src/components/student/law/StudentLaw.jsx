import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentLaw(props) {
  const [userData, setUserData] = useRecoilState(userState);
  const [lawList, setLawList] = useState([]); //법 항목
  const [fineStudentList, setFineStudentList] = useState([]); //벌금 부여 항목
  const [penaltyStudentList, setPenaltyStudentList] = useState([]); //벌칙 부여 항목
  const navigate = useNavigate();
  const numberOfLawList = lawList.length;
  const numberOfFineList = fineStudentList.length;
  const numberOfPenaltyList = penaltyStudentList.length;

  const divStyle = {
    width: "80%",
    borderRadius: "40px",
    backgroundColor: "#ffc107"
  };
  const heightStyle = {
    height: "85%",
    borderRadius: "40px",
    backgroundColor: '#FFFEEE',
  };

  const colStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }


  const hrStyle = {
    width: "100%",
    height: "5px",
    backgroundColor: "black",
    margin : "5px"
  }

  //법 항목 리스트 뽑아오기
  useEffect(() => {
      const token = userData.accessToken;
      if (!token) {
          navigate("/");
      }

      axBase(token)({
      method: "post",
      url: "/law/list",
      data: {
          nationNum: userData.nationNum,
      },
      })
      .then((response) => {
          console.log(response.data.data);
          setLawList(response.data.data);
      })
      .catch((err) => {
          alert(err.response.data.message);
      });

  }, []);

  //법 항목 출력
  const LawItems = lawList.map((item,index)=>(

    <div key={index} className="row justify-content-md-center p-1" style={{fontSize:"25px", textAlign:"center"}}>
      <div className="col-1 p-2">{index+1}</div>
      <div className="col-4 p-2">{item.content}</div>
      {item.type === 0 && (
        <div className="col-3 p-2">{item.fine}</div>
      )}
      {item.type === 1 &&(
        <div className="col-3 p-2">{item.penalty}</div>
      )}
      <div className="col-3 p-2">{item.createdDate}</div>
      <hr></hr>
    </div>
  ));

  //부과된 벌금 리스트
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
        navigate("/");
    }
    
    axBase(token)({
        method: "post",
        url: "/student/law/fine/list",
        data: {
          nationStudentNum: userData.nationStudentNum,
        },
        })
        .then((response) => {
            console.log(response.data.data);
            setFineStudentList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

  }, []);

  //부여된 벌금 출력
  const FineItems = fineStudentList.map((item,index)=>(

    <div key={index}>
    <div className="row justify-content-md-center p-1 align-items-center" style={{ fontSize: "25px", textAlign: "center" }}>
      <div className="col-2">{index + 1}</div>
      <div className="col-4">{item.content}</div>
      <div className="col-2">{item.fine}</div>
      <div className="col-3">{item.createdDate}</div>
    </div>
    <hr></hr>
    </div>
  ));

  //부과된 벌칙 리스트
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
        navigate("/");
    }

    axBase(token)({
        method: "post",
        url: "/student/law/penalty/list",
        data: {
          nationStudentNum: userData.nationStudentNum,
        },
        })
        .then((response) => {
            console.log(response.data.data);
            setPenaltyStudentList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

  }, []);

  //부여된 벌칙 출력
  const PenaltyItems = penaltyStudentList.map((item,index)=>(

    <div key={index}>
    <div className="row justify-content-md-center p-1 align-items-center" style={{ fontSize: "25px", textAlign: "center" }}>
      <div className="col-1">{index + 1}</div>
      <div className="col-3" style={{ ...colStyle, overflow: 'hidden' }}>{item.content}</div>
      <div className="col-3" style={{ ...colStyle, overflow: 'hidden' }}>{item.penalty}</div>
      <div className="col-2" style={{ ...colStyle }}>{item.createdDate}</div>
      {item.penaltyCompleteState === 0 && (
        <div className="col-3">미수행</div>
      )}
      {item.penaltyCompleteState === 1 && (
        <div className="col-3">수행</div>
      )}
    </div>
    <hr></hr>
    </div>
  ));

  return (
    <div className="border border-dark  border-3 p-3 h-100" style={divStyle}>
      {props.state === 0 ? (
        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">나라 법 조회하기</div>
          {numberOfLawList === 0 ? (
            <div className="border border-dark  border-3 p-3 my-3" style={heightStyle}>
              <div className="h-100 d-flex justify-content-center align-items-center">
                아직 제정된 법이 없습니다.
              </div>
            </div>
          ): (
            <>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={heightStyle}>
              <div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-1">No.</div>
                <div className="col-4">법 항목</div>
                <div className="col-3">부과내용</div>
                <div className="col-3">제정일</div>
              </div>
              <div style={hrStyle}></div>
              <div className="scrollCss" style={{overflowX:'hidden', overflowY:'auto', height:'50vh'}}>
                {LawItems}
              </div>
            </div>
            </>
          )}
        </div>
      ) :props.state === 1 ? (
        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">벌금 내역 보기</div>
          {numberOfFineList === 0 ? (
            <div className="border border-dark  border-3 p-3 my-3" style={heightStyle}>
              <div className="h-100 d-flex justify-content-center align-items-center">
                부과된 벌금이 없습니다.
              </div>
            </div>
          ): (
            <>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={heightStyle}>
              <div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-2">No.</div>
                <div className="col-4">법 항목</div>
                <div className="col-2">벌금</div>
                <div className="col-3">부과일</div>
              </div>
              <div style={hrStyle}></div>
              <div className="scrollCss" style={{overflowX:'hidden', overflowY:'auto', height:'50vh'}}>
                {FineItems}
              </div>
            </div>
            </>
          )}
        </div>
      ):(
        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">벌칙 내역 보기</div>
          {numberOfPenaltyList === 0 ? (
            <div className="border border-dark  border-3 p-3 my-3" style={heightStyle}>
              <div className="h-100 d-flex justify-content-center align-items-center">
                부과된 벌칙이 없습니다.
              </div>
            </div>
          ): (
            <>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={heightStyle}>
              <div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-1">No.</div>
                <div className="col-3">법 항목</div>
                <div className="col-3">벌칙</div>
                <div className="col-2">부과일</div>
                <div className="col-3">수행여부</div>
              </div>
              <div style={hrStyle}></div>
              <div className="scrollCss" style={{overflowX:'hidden', overflowY:'auto', height:'50vh'}}>
                {PenaltyItems}
              </div>
            </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}