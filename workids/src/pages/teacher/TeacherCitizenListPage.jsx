import React from "react";
import TeacherSideNav from '../../components/teacher/TeacherSideNav';
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
import TeacherCitizenList from "../../components/teacher/nation/TeacherCitizenList";
export default function TeacherCitizenPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex ">
        <TeacherSideNav />
        <TeacherCitizenList />
      </div>
    </div>
  );
}
