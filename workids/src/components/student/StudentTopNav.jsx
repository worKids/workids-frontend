import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
export default function StudentTopNav() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const divStyle = {
    height: "13%",
  };
  const navigateToSelect = () => {
    navigate("/select");
  };
  return (
    <div style={divStyle} className="fs-3 mx-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="mx-3" onClick={navigateToSelect}>
            로고 칸
          </div>
          <div className="mx-3">{userData.nationName}</div>
          <div className="mx-3">{userData.userName}</div>
        </div>
        <div className="m-3">마이페이지</div>
      </div>
      <div className="mx-3"></div>
    </div>
  );
}
