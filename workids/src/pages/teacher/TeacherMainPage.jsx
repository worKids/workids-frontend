import React, { useEffect } from "react";
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import { axBase } from "../../apis/axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
export default function TeacherMainPage() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const divStyle = {
    width: "80%",
  };

  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/nation/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);
  return (
    <div className="h-100">
      <TeacherTopNav />
      <div className="d-flex h-75">
        <TeacherSideNav />
        <div className="d-flex" style={divStyle}>
          <div className="w-50 p-3">
            <div className="border border-dark  border-3">나라 정보</div>
            <div className="border border-dark  border-3">국민 수</div>
          </div>
          <div className=" w-50 p-3">
            <div className="border border-dark  border-3">나라 법</div>
          </div>
        </div>
      </div>
    </div>
  );
}
