import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentAuctionList() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [aucList, setAucList] = useState([]);
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/student/auction/list",
      data: {
        nationNum: userData.nationNum,
        nationStudentNum: userData.nationStudentNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setAucList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  const auctionList =
    aucList !== null ? (
      aucList.map((menu, index) => (
        <div key={index}>
          <div className="row text-center my-4 fs-4">
            <div className="col-2 d-flex justify-content-center align-items-center">
              {index + 1}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.seatNumber}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.submitPrice}
            </div>

            {menu.auctionState === 0 ? (
              <div className="col-2 d-flex justify-content-center align-items-center">진행 중</div>
            ) : menu.resultType === 1 ? (
              <div className="col-2 d-flex justify-content-center align-items-center">낙찰</div>
            ) : (
              <div className="col-2 d-flex justify-content-center align-items-center">미낙찰</div>
            )}

            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.resultSeat}
            </div>
          </div>
          <hr />
        </div>
      ))
    ) : (
      <div className="h-100 d-flex justify-content-center align-items-center">
        생성된 경매가 없습니다.
      </div>
    );

  return (
    <div>
      <div>
        <div className="row  m-2 text-center  fs-3">
          <div className="col-2">번호</div>
          <div className="col-2">경매 날짜</div>
          <div className="col-2">신청번호</div>
          <div className="col-2">금액</div>
          <div className="col-2">결과</div>
          <div className="col-2">배정된 번호</div>
        </div>
        <div className="container overflow-auto scrollCss" style={{ height: "55vh" }}>
          {auctionList}
        </div>
      </div>
    </div>
  );
}
