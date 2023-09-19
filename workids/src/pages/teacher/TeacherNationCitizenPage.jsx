import React from "react";

import TeacherSideNav from '../../components/teacher/TeacherSideNav';
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
import TeacherCitizen from "../../components/teacher/nation/TeacherCitizen";

export default function TeacherNationCitizenPage() {
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
