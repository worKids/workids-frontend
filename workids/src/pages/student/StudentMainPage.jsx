import React, { useState } from "react";
import StudentTopNav from "../../components/student/StudentTopNav";

export default function StudentMainPage() {
  return (
    <div className="h-100">
      <StudentTopNav />
      <div className="d-flex justify-content-between  h-25">
        <div className="w-50">나라 법</div>
        <div className="d-flex w-50 h-50">
          <div>자산</div>
          <div>자산</div>
        </div>
      </div>
    </div>
  );
}
