import React from "react";
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
export default function TeacherMainPage() {
  const divStyle = {
    width: "80%",
  };
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
