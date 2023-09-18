import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../recoil/userAtoms";
import "../pages/student/student.css";
import "./teacher/Teacher.css";
import { useNavigate } from "react-router";
export default function NavModal() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const recoilReset = useResetRecoilState(userState);
  const navigateToSelect = () => {
    navigate("/select");
  };
  const logout = () => {
    recoilReset;
    navigate("/");
  };
  return (
    <div>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fs-3" id="offcanvasRightLabel">
          {userData.userType === "teacher" ? `${userData.userName} 선생님` : userData.userName}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <hr />
      <div className="offcanvas-body fs-4">
        <div className="mt-5">
          <div
            className="hoverable my-3 border border-dark w-75 mx-auto border-3 text-center p-3 rounded-pill"
            onClick={navigateToSelect}
          >
            나라 선택
          </div>
          <div className="hoverable my-3 border border-dark w-75 mx-auto border-3 text-center p-3 rounded-pill">
            회원 정보 변경
          </div>
          <div
            className="hoverable my-3 border border-dark w-75 mx-auto border-3 text-center p-3 rounded-pill bg-danger text-white"
            onClick={logout}
          >
            로그아웃
          </div>
          <div className="bibi mx-auto mt-5"></div>
        </div>
      </div>
    </div>
  );
}
