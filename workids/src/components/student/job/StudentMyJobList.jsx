import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentJobList({ citizenNumber }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const [myJobList, setMyJobList] = useState([]); //직업 항목
  const divListStyle = {
    borderRadius: "20px",
    backgroundColor: "#FEE173",
    border: "solid 5px #F6BE2C"
}

  //내 직업 출력
  const MyJobItems = myJobList.map((menu, index) => (
    <tr key={`${index}_name`} style={{ borderTop: '3px solid black', borderBottom: '1px solid black', padding: '10px', lineHeight: '5 0px' }}>
      <td style={{ fontSize: '20px' }}>{index + 1}</td>
      <td style={{ fontSize: '20px' }}>{menu.name}</td>
      <td style={{ fontSize: '20px' }}>{menu.salary}</td>
      <td style={{ fontSize: '20px' }}>{menu.createDate}</td>
      <td style={{ fontSize: '20px' }}>{menu.updateDate}</td>
    </tr>
  ));
    



  //내 직업리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/student/job/my/list",
      data: {
        nationNum: userData.nationNum,
        nationStudentNum: userData.nationStudentNum
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setMyJobList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);


  return (
    <div className="p-3">
      
      <div className="d-flex justify-content-between align-items-center"></div>
      <div className="overflow-auto m-3 p-4 scrollCss" style={{ ...divListStyle, maxHeight: '60vh' }}>
      <table style={{ width: '100%' }}>
            <thead>
              <tr>
              <th style={{ width: '20%', fontSize: '22px' }}>No.</th>
              <th style={{ width: '20%', fontSize: '22px' }}>직업</th>
              <th style={{ width: '20%', fontSize: '22px' }}>월급</th>
              <th style={{ width: '20%', fontSize: '22px' }}>시작일</th>
              <th style={{ width: '20%', fontSize: '22px' }}>종료일</th>
              </tr>
            </thead>
            <tbody>
              {MyJobItems}
            </tbody>
            
          </table>
        
      </div>



      {/* <hr> 요소를 테이블 밖에서 사용하세요 */}
    </div>
  );
}


