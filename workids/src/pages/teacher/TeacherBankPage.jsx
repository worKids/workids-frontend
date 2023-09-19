import React from "react";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import TeacherBank from "../../components/teacher/bank/TeacherBank";

export default function TeacherBankPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex ">
        <TeacherSideNav />
        <TeacherBank />
      </div>
    </div>
  );
}
