import React from "react";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import TeacherNation from "../../components/teacher/nation/TeacherNation";

export default function TeacherNationPage() {
  return ( 
    <div>
    <TeacherTopNav />
    <div className="d-flex ">
      <TeacherSideNav />
      <TeacherNation />
    </div>
    </div>
  );
}
