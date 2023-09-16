import React from "react";

import TeacherSideNav from '../../components/teacher/TeacherSideNav';
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
import TeacherLaw from "../../components/teacher/law/TeacherLaw";

export default function TeacherLawPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex ">
        <TeacherSideNav />
        <TeacherLaw />
      </div>
    </div>
  );
}
