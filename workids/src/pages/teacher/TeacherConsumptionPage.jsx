import React from "react";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
import TeacherConsumption from "../../components/teacher/consumption/TeacherConsumption";

export default function TeacherConsumptionPage() {
  return (
    <div>
      <TeacherTopNav/>
      <div className="d-flex">
        <TeacherSideNav/>
        <TeacherConsumption/>
      </div>
    </div>
  );
}
