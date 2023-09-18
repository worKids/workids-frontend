import React from "react";
import TeacherSideNav from '../../components/teacher/TeacherSideNav';
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
import TeacherCitizen from "../../components/teacher/citizen/TeacherCitizen";
export default function TeacherCitizenPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex ">
        <TeacherSideNav />
        <TeacherCitizen />
      </div>
    </div>
  );
}
