import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentJobList({ citizenNumber }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const [myJobList, setMyJobList] = useState([]); //직업 항목

   //내 직업 출력
    const MyJobItems  = myJobList.map((menu, index) => (
      <tr>
      <td></td>
      <td>{menu.name}</td>
      <td>{menu.salary}</td>
      <td>{menu.createDate}</td>
      <td>{menu.updateDate}</td>
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
        nationStudentNum : userData.nationStudentNum
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
    <div className="border border-dark border-3 p-3">

      <div className="d-flex justify-content-between">
        <div className="d-flex">{/* menu 변수가 무엇인지 여기에 표시하세요 */}</div>
        <div>내 직업 조회하기</div>
      </div>
      <div>
        <table>

          <thead>
            <tr>
            <th style={{ width: '20%' }}>No</th>
              <th style={{ width: '20%' }}>직업</th>
              <th style={{ width: '40%' }}>월급</th>
              <th style={{ width: '40%' }}>시작일</th>
              <th style={{ width: '40%' }}>종료일</th>
            </tr>
          </thead>
          <tbody>
              {MyJobItems}
          </tbody>


        </table>
      </div>
      {/* <hr> 요소를 테이블 밖에서 사용하세요 */}
      <hr />
    </div>
  );
}