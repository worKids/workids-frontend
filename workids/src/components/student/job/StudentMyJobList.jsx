import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentJobList({ citizenNumber }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const [myJobList, setMyJobList] = useState([]); //직업 항목

  //내 직업 출력
  const MyJobItems = myJobList.map((menu, index) => (
    <tr key={`${index}_name`} style={{ borderTop: '3px solid black', padding: '10px', borderBottom : '1px solid black', padding: '10px' }} >
      <td>{'\u00A0\u00A0\u00A0\u00A0'}{index + 1}</td>
      <td>{menu.name}</td>
      <td>{'\u00A0\u00A0\u00A0\u00A0'}{menu.salary}</td>
      <td>{menu.createDate}</td>
      <td>{menu.updateDate}</td>
      
    </tr >
    

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
      <div style={{ overflowY: 'auto', maxHeight: '400px' }}></div>
      <div className="d-flex justify-content-between align-items-center"></div>
        <div className="d-flex">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '10%', fontSize: '22px', padding: '10px', margin: '0' }}>No</th>
                <th style={{ width: '20%', fontSize: '22px', padding: '10px', margin: '0' }}>직업</th>
                <th style={{ width: '20%', fontSize: '22px', padding: '10px', margin: '0' }}>월급</th>
                <th style={{ width: '20%', fontSize: '22px', padding: '10px', margin: '0' }}>시작일</th>
                <th style={{ width: '20%', fontSize: '22px', padding: '10px', margin: '0' }}>종료일</th>
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


