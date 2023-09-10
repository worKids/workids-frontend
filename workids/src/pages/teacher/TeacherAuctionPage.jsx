import React from "react";

import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import TeacherAuction from "../../components/teacher/TeacherAuction";
export default function TeacherAuctionPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex ">
        <TeacherSideNav />
        <TeacherAuction />
      </div>
    </div>
  );
}
