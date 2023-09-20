import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentJobList({ citizenNumber }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const [jobList, setJobList] = useState([]); //직업 항목

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
      <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
        {/* 스크롤 가능한 컨테이너 */}
        <table style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
          {jobList.map((menu, index) => (
            <tbody key={index} style={{ fontSize: 'px', height: '15vh' }}>
              <tr key={`${index}_row`} style={{ borderTop: '3px solid black', padding: '10px' }}>
                <td style={{ width: '30%' }}>No. {index + 1}</td>
                <td style={{ width: '30%' }}>직업명</td>
                <td style={{ width: '40%' }}>{menu.name}</td>
              </tr>
              <tr key={`${index}_content`}>
                <td style={{ width: '30%' }}></td>
                <td>업무항목</td>
                <td key={index}>{menu.jobToDoContent}</td>
              </tr>
              <tr key={`${index}_salary`}>
                <td style={{ width: '30%' }}></td>
                <td>월급</td>
                <td key={index}>{menu.salary}미소</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
          }