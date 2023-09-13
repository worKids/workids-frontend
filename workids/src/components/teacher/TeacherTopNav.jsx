import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
export default function TeacherTopNav() {
  const [userData, setUserData] = useRecoilState(userState);
  const navigate = useNavigate();
  const divStyle = {
    height: "13%",
  };
  const navigateToSelect = () => {
    
    navigate("/select");
  };
  return (
    <div style={divStyle} className="fs-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="m-3" onClick={navigateToSelect}>
            로고 칸
          </div>
          <div className="m-3">{userData.userName} 선생님</div>
        </div>
        <div className="m-3">마이페이지</div>
      </div>
    </div>
  );
}
