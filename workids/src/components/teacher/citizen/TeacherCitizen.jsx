import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import TeacherCreditRatingUpdate from "./TeacherCreditRatingUpdate";
import TeacherImmigrantList from "./TeacherImmigrantList";
import TeacherImmigrantList2 from "./TeacherImmigrantList2";
import TeacherCitizenInfo from "./TeacherCitizenInfo";


export default function TeacherCitizen() {
  const citizenMenu = ["국민 조회", "신용도 관리", "이민자 관리", "통계 조회"];
  const [state, setState] = useState(0);//버튼 클릭
  const [userData, setUserData] = useRecoilState(userState);
  const [citizenList, setCitizenList] = useState([]); //국민 항목
  const [creditRatingList, setCreditRatingList] = useState([]); //국민 항목
  const navigate = useNavigate();
  const handleCreditRatingChange = (e, index) => {
    const updatedCreditRatingList = [...creditRatingList];
    updatedCreditRatingList[index].creditRating = e.target.value;
    setCreditRatingList(updatedCreditRatingList);
  };
  const [inputValue, setInputValue] = useState(""); // 입력한 값을 상태로 관리합니다.





  const handleInputChange = (e) => {
    // 입력값이 변경될 때 상태를 업데이트합니다.
    setInputValue(e.target.value);
  };


  const clickMenu = (idx) => {
    setState(idx);
  };


  const divStyle = {
    width: "80%",
    borderRadius: "40px",
  };

  //직업 메뉴의 탭들
  const menu = citizenMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => clickMenu(index)}
      className={`m-2 border border-dark  border-3 text-center p-3 rounded-pill ${state === index ? "bg-warning text-white" : ""
        }`}
    >
      {menu}
    </div>
  ));

  const [radioValue, setRadioValue] = useState('option1'); // 초기 상태 설정

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value); // 라디오 버튼 값 변경
  };




  //국민관리 리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/teacher/citizen/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setCitizenList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);

  //신용도 리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/teacher/citizen/credit/list",
      data: {
        nationNum: userData.nationNum,

      },
    })
      .then((response) => {
        console.log(response.data.data);
        setCreditRatingList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);





  // 국민관리 출력화면
  const citizenItems = citizenList.map((menu, index) => (
    <tr key={index} style={{ borderTop: '2.5px solid black' }}>
      <td style={{ width: '20%', padding: '10px', fontSize: '20px' }}>
        <TeacherCitizenInfo citizenNumber={menu.citizenNumber} />
      </td>
      <td style={{ width: '20%', padding: '10px', fontSize: '17px' }}>{menu.studentName}</td>
      <td style={{ width: '20%', padding: '10px', fontSize: '17px' }}>{menu.name}</td>
      <td style={{ width: '20%', padding: '10px', fontSize: '17px' }}>{menu.asset}</td>
      <td style={{ width: '20%', padding: '10px', fontSize: '17px' }}>{'\u00A0\u00A0\u00A0'}{menu.credit_rating}</td>
    </tr>
  ));




  //신용도관리 출력화면
  const creditRatingItems = creditRatingList.map((menu, index) => (
    <tr key={index} style={{ borderTop: '2.5px solid black' }}>
      <td style={{ width: '20%', padding: '2px', fontSize: '17px' }}>{menu.citizenNumber}</td>
      <td style={{ width: '20%', padding: '2px', fontSize: '17px' }}>{menu.studentName}</td>
      <td style={{ width: '20%', padding: '2px', fontSize: '17px' }}>
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={menu.creditRating}
          onChange={(e) => handleCreditRatingChange(e, index)}
        />
      </td>
      <td style={{ width: '20%', padding: '2px', fontSize: '15px' }}>
        <TeacherCreditRatingUpdate citizenNumber={menu.citizenNumber} creditRating={menu.creditRating} />
      </td>
    </tr>
  ));






  return (
    <div style={divStyle} className="border border-dark border-3 p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">{menu}</div>
        <div>국민 관리</div>
      </div>

      {state === 0 ? (
        <div>

          <table style={{ marginLeft: 'auto', marginRight: 'auto', width: '85%' }}>
            <thead>
              <tr>
                <th style={{ width: '20%', fontSize: '21px', padding: '10px' }}>학급 번호</th>
                <th style={{ width: '20%', fontSize: '21px', padding: '10px' }}>이름</th>
                <th style={{ width: '20%', fontSize: '21px', padding: '10px' }}>직업</th>
                <th style={{ width: '20%', fontSize: '21px', padding: '10px' }}>자산</th>
                <th style={{ width: '20%', fontSize: '21px', padding: '10px' }}>신용도</th>
              </tr>
            </thead>
            <tbody>
              {citizenItems}
            </tbody>
          </table>

        </div>
      ) : state === 1 ? (
        <div>
          <div style={{ overflowX: 'auto', width: '80%', margin: '0 auto' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '20%', fontSize: '20px', padding: '10px' }}>학급 번호</th>
                  <th style={{ width: '40%', fontSize: '20px', padding: '10px' }}>이름</th>
                  <th style={{ width: '40%', fontSize: '20px', padding: '10px' }}>신용도</th>
                  <th style={{ width: '40%', fontSize: '20px', padding: '10px' }}></th>
                </tr>
              </thead>
              <tbody>
                {creditRatingItems}
              </tbody>
            </table>
          </div>

        </div>
      ) : state === 2 ? (

        <div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ marginRight: '40px', marginTop: '20px' }}> {/* marginTop 추가 */}
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={radioValue === 'option1'}
                  onChange={handleRadioChange}
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
                <label htmlFor="option1" style={{ fontSize: '35px' }}>국적취득신고</label>
              </div>
              <div style={{ marginRight: '40px', marginTop: '20px' }}> {/* marginTop 추가 */}
                <input
                  type="radio"
                  id="option2"
                  value="option2"
                  checked={radioValue === 'option2'}
                  onChange={handleRadioChange}
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
                <label htmlFor="option1" style={{ fontSize: '35px' }}>국적이탈신고</label>
              </div>
            </div>



            {radioValue === 'option1' ? (
              <div style={{ marginTop: '20px' }}> {/* 위로 10px만큼 내리기 */}
                {/* 1번 라디오 버튼을 선택한 경우 보여질 내용 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {/* 가운데 정렬 */}
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{
                      width: '160px', // 원하는 넓이로 조절
                      marginRight: '10px',
                    }}
                  />
                  <div>

                  <TeacherImmigrantList citizenNumber={inputValue} />
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '20px' }}> {/* 위로 10px만큼 내리기 */}
                {/* 2번 라디오 버튼을 선택한 경우 보여질 내용 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {/* 가운데 정렬 */}
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{
                      width: '160px', // 원하는 넓이로 조절
                      marginRight: '10px',
                    }}
                  />
                  <TeacherImmigrantList2 citizenNumber={inputValue} />
                </div>
              </div>
            )}



          </div>
        </div>
      ) : (
        <p> 통계페이지</p>
      )}

    </div>
  );
}