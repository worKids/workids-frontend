import React from "react";
import TeacherSideNav from '../../components/teacher/TeacherSideNav';
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
import TeacherJob from "../../components/teacher/job/TeacherJob";
export default function TeacherJobPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex ">
        <TeacherSideNav />
        <TeacherJob />
      </div>
    </div>
  );
}
