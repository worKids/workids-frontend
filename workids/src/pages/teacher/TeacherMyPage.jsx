import React from "react";

import MyPageSideNav from '../../components/MyPageSideNav';
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
import TeacherMyPage from "../../components/teacher/nation/TeacherMyPage";

export default function TeacherLawPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex ">
        <MyPageSideNav />
        <TeacherMyPage />
      </div>
    </div>
  );
}
