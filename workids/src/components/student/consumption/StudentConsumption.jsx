import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import StudentConsumptionCreate from "./StudentConsumptionCreate";
import StudentConsumptionDelete from "./StudentConsumptionDelete";

export default function StudentConsumption(props) {
  const [userData, setUserData] = useRecoilState(userState);
  const navigate = useNavigate();
  const [consumptionList, setConsumptionList] = useState([]); //소비 항목 리스트
  const [studentConsumptionList, setStudentConsumptionList] = useState([]); // 신청 리스트
  const [approvalConsumptionList, setApprovalConsumptionList] = useState([]); // 결재 완료 리스트
  const numberOfConsumptionList = consumptionList.length;
  const numberOfStudentConsumptionList = studentConsumptionList.length;
  const numberOfApprovalConsumptionList = approvalConsumptionList.length;
  const [updateCheck, setUpdateCheck] = useState(0);

  const handleUpdateCheck = () => {
    setUpdateCheck((updateCheck + 1) % 2);
  };

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

  const hrStyle = {
    width: "100%",
    height: "5px",
    backgroundColor: "black",
    margin : "5px"
  }

  const colStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }

  //내 소비 신청 내역 조회
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
        navigate("/");
    }

    axBase(token)({
        method: "post",
        url: "/consumption/list",
        data: {
            nationNum: userData.nationNum,
        },
        })
        .then((response) => {
            console.log(response.data.data);
            setConsumptionList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
  }, [updateCheck]);

  //소비 항목 출력
  const ConsumptionItems = consumptionList.map((item,index)=>(
    <div key={index} >
    <div className="row d-flex justify-content-md-center p-1 align-items-center" style={{ fontSize: "25px", textAlign: "center" }}>
      <div className="col-2 ">{index + 1}</div>
      <div className="col-4 " style={{ ...colStyle, overflow: 'hidden' }}>{item.content}</div>
      <div className="col-3 ">{item.amount}</div>
      <div className="col-2 "><StudentConsumptionCreate consumptionNum={item.consumptionNum} onUpdate={handleUpdateCheck} /></div>
    </div>
    <hr></hr>
    </div>
  ));

  //소비 신청 내역 조회
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
        navigate("/");
    }

    axBase(token)({
        method: "post",
        url: "/student/consumption/list",
        data: {
          nationStudentNum: userData.nationStudentNum,
        },
        })
        .then((response) => {
            console.log(response.data.data);
            setStudentConsumptionList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

  }, [updateCheck]);

  //소비 신청 내역 출력
  const StudentConsumptionItems = studentConsumptionList.map((item,index)=>(
    <div key={index} >
    <div  className="row justify-content-md-center p-1 align-items-center" style={{ fontSize: "25px", textAlign: "center" }}>
      <div className="col-1 ">{index + 1}</div>
      <div className="col-3 " style={{ ...colStyle, overflow: 'hidden' }}>{item.content}</div>
      <div className="col-2 ">{item.amount}</div>
      <div className="col-2 " style={{ ...colStyle }}>{item.createdDate}</div>
      {item.state === 0 ? (
        <div className="col-1 "><StudentConsumptionDelete consumptionNationStudentNum={item.consumptionNationStudentNum} onUpdate={handleUpdateCheck} /></div>
      ) : (
        <div className="col-1 "></div>
      )}
      {item.state === 0 && (
        <div className="col-2 ">대기중</div>
      )}
      {item.state === 1 && (
        <div className="col-2">승인됨</div>
      )}
      {item.state === 2 && (
        <div className="col-2">거절됨</div>
      )}
      {item.state === 3 && (
        <div className="col-2">취소됨</div>
      )}
    </div>
    <hr></hr>
    </div>
  ));

  //소비 승인 완료 내역 조회
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
        navigate("/");
    }

    axBase(token)({
        method: "post",
        url: "/student/consumption/complete/list",
        data: {
          nationStudentNum: userData.nationStudentNum,
        },
        })
        .then((response) => {
            console.log(response.data.data);
            setApprovalConsumptionList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
  }, [updateCheck]);

  //소비 승인 완료 항목 출력
  const ApprovalItems = approvalConsumptionList.map((item,index)=>(
    <div key={index} >
    <div className="row justify-content-md-center p-1 align-items-center" style={{ fontSize: "25px", textAlign: "center" }}>
      <div className="col-1">{index + 1}</div>
      <div className="col-3" style={{ ...colStyle, overflow: 'hidden' }}>{item.content}</div>
      <div className="col-2">{item.amount}</div>
      <div className="col-3" style={{ ...colStyle, overflow: 'hidden' }}>{item.createdDate}</div>
      <div className="col-3" style={{ ...colStyle, overflow: 'hidden' }}>{item.updatedDate}</div>
    </div>
    <hr></hr>
    </div>
  ));

  return (
    <div className="border border-dark  border-3 p-3 h-100" style={divStyle}>
      {props.state === 0 ? (
        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">소비 신청하기</div>
          {numberOfConsumptionList === 0 ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              아직 생성된 소비 항목이 없습니다.
            </div>
          ) : (
            <>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={heightStyle}>
              <div className="row justify-content-md-center p-" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-2">No.</div>
                <div className="col-4">소비 항목</div>
                <div className="col-3">금액</div>
                <div className="col-2"></div>
              </div>
              <div style={hrStyle}></div>
              <div className="scrollCss" style={{overflowX:'hidden', overflowY:'auto', height:'50vh'}}>
                {ConsumptionItems}
              </div>
            </div>
            </>
          )}
        </div>
      ) :props.state === 1 ? (
        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">소비 신청 내역 보기</div>
          {numberOfStudentConsumptionList === 0 ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              신청한 소비 항목이 없습니다.
            </div>
          ) : (
            <>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={heightStyle}>
              <div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-1">No.</div>
                <div className="col-3">소비 항목</div>
                <div className="col-2">금액</div>
                <div className="col-2">신청일</div>
                <div className="col-1"></div>
                <div className="col-2">상태</div>
              </div>
              <div style={hrStyle}></div>
              <div className="scrollCss" style={{overflowX:'hidden', overflowY:'auto', height:'50vh'}}>
                {StudentConsumptionItems}
              </div>
            </div>
            </>
          )}
        </div>
      ):(
        <div className="h-100">
          <div className="mx-3 mt-2 fs-3">소비 완료 내역 보기</div>
          {numberOfApprovalConsumptionList === 0 ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              소비 완료 항목이 없습니다.
            </div>
          ) : (
            <>
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={heightStyle}>
              <div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-1">No.</div>
                <div className="col-3">소비 항목</div>
                <div className="col-2">금액</div>
                <div className="col-3">신청일</div>
                <div className="col-3">승인일</div>
              </div>
              <div style={hrStyle}></div>
              <div className="scrollCss" style={{overflowX:'hidden', overflowY:'auto', height:'50vh'}}>
                {ApprovalItems}
              </div>
            </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}