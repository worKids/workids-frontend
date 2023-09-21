import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentJobList({ citizenNumber }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const [jobList, setJobList] = useState([]); //직업 항목
  const divListStyle = {
    borderRadius: "20px",
    backgroundColor: "#FEE173",
    border: "solid 5px #F6BE2C"
  }

  const divStyle = {
    width: "80%",
    height: "80vh",
    borderRadius: "40px",
    backgroundColor: "#FFFEEE",
  };

  //직업리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/job/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setJobList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);


  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center"></div>
      <div className="overflow-auto m-3 p-4 scrollCss" style={{ ...divListStyle, maxHeight: '60vh' }}>
        <div className="row p-1" style={{ fontSize: "30px", textAlign: "left" }}>
          <div className="col-1 offset-2">No.</div>
          <div className="col-2"></div>

          <div className="col-3">상세 정보</div>
        </div>
        {/* 스크롤 가능한 컨테이너 */}
        <table style={{ marginLeft: 'auto', marginRight: '10px', width: '90%' }}>
          {jobList.map((menu, index) => (


<tbody key={index} style={{ fontSize: '20px', height: '15vh' }}>
  <tr key={`${index}_content`} style={{ borderTop: '3px solid black', padding: '10px' }}>
    <td className="col-3 pr-0" rowSpan="3" style={{ borderTop: 'none', padding: '0' }}>
      {index + 1}
    </td>
    <td  style={{ width: '30%' }}>직업명 :</td>
    <td  style={{ width: '30%' }}>{menu.name}</td>
  </tr>
  <tr key={`${index}_content`}>
  <td  style={{ width: '30%' }}>업무항목 :</td>
  <td  style={{ width: '30%' }}>{menu.jobToDoContent}</td>
  </tr>
  <tr key={`${index}_salary`}>
    <td className="col-5 pr-0">월급 :</td>
    <td className="col-5" key={index}>{menu.salary}</td>
  </tr>
</tbody>
          ))}
        </table>
      </div>
    </div>
  );
}