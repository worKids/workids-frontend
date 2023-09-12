import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
export default function TeacherTopNav() {
  const userData = useRecoilValue(userState);
  const divStyle = {
    height: "13%",
  };
  return (
    <div style={divStyle} className="fs-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="m-3">로고 칸</div>
          <div className="m-3">{userData.userName} 선생님</div>
        </div>
        <div className="m-3">마이페이지</div>
      </div>
      <div className="mx-3">{userData.nationName}</div>
    </div>
  );
}
