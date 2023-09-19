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
    <div className="border border-dark border-3 p-3">

      <div className="d-flex justify-content-between">
        <div className="d-flex">{/* menu 변수가 무엇인지 여기에 표시하세요 */}</div>
        <div>전체 직업 조회하기</div>
      </div>



      <div>
        <table style={{ marginLeft: '10%' }}>
       
          {jobList.map((menu, index) => (
            <tbody key={index}>
               <tr>
                <td style={{ width: '40%' }}>No</td>
               
              </tr>
              <tr key={`${index}_name`}>
                <td style={{ width: '40%' }}>직업명</td>
                <td style={{ width: '50%' }}>{menu.name}</td>
              </tr>
              <tr key={`${index}_content`}>
                <td>해야할 일</td>
                <td key={index}>{menu.jobToDoContent}</td>
              </tr>
              <tr key={`${index}_salary`}>
                <td>월급</td>
                <td key={index}>{menu.salary}미소</td>
              </tr>
              <tr>
                <div>
                
                </div>
              </tr>
              <hr></hr>
            </tbody>
          ))}
        </table>
      </div>
      {/* <hr> 요소를 테이블 밖에서 사용하세요 */}
      <hr />
    </div>
  );
}