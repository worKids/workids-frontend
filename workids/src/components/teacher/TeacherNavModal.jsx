import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router";
import { axBase } from "../../apis/axiosInstance";

export default function TeacherNavModal() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          선생님
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <hr />
      <div className="offcanvas-body">...</div>
    </div>
  );
}
