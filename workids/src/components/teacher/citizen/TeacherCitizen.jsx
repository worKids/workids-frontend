import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { axBase } from "../../../apis/axiosInstance";
import Form from 'react-bootstrap/Form';
import TeacherCreditRatingUpdate from "./TeacherCreditRatingUpdate";
import TeacherImmigrantList from "./TeacherImmigrantList";
import TeacherImmigrantList2 from "./TeacherImmigrantList2";
import TeacherCitizenInfo from "./TeacherCitizenInfo";


export default function TeacherCitizen() {
  const [show, setShow] = useState(false);
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
  const [rankingList, setLankingList] = useState({ assetRanking: [], consumptionRanking: [], savingRanking: [], fineRanking: [] });
  const numberOfAsset = rankingList.assetRanking.length;
  const numberOfConsumption = rankingList.consumptionRanking.length;
  const numberOfSaving = rankingList.savingRanking.length;
  const numberOfFine = rankingList.fineRanking.length;
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [selectedTab2, setSelectedTab2] = useState('tab1'); // 초기 탭 설정
  const [type, setType] = useState('t');


  const divBlock = {
    display: "inline-block",
    borderRadius: "25px",
    width: "25%",
    backgroundColor: 'rgba(217, 217, 217, 0.5)'
  }

  const handleTabChange = (e) => {
    if (e.target.id === 'inline-radio-1') {
      setSelectedTab('tab1'); // 1번이 선택되면 tab1 표시
      setType('t');
    } else if (e.target.id === 'inline-radio-2') {
      setSelectedTab('tab2'); // 2번이 선택되면 tab2 표시
      setType('m');
    }
  };

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
    height: "80vh"
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

  const [citizenInfo, setCitizenInfo] = useState([]); // 국민 항목
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleCitizenInfo = (citizenNumber) => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    // 상세정보 가져오기
    axBase(token)({
      
      method: "post",
      url: "/teacher/citizen/info/list",
      data: {
        nationNum: userData.nationNum,
        
        citizenNumber: citizenNumber
      },
    })
      .then((response) => {

        setCitizenInfo(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const citizenInfoItems = citizenInfo.map((menu, index) => (
    <tr key={index}>
      <td className="info-cell">
        <span className="info-label">{menu.citizenNumber}번</span>
      </td>
      <td className="info-cell">
        <span className="info-label">{menu.studentName}</span>
      </td>
      <td className="info-cell">
        <span className="info-label">{menu.name}</span>
      </td>
      <td className="info-cell">
        <span className="info-label">{menu.creditRating}점</span>
      </td>
    </tr>

  ));

  const handleInfoTabChange = (e) => {
    if (e.target.id === 'inline-radio-1') {
      setSelectedTab2('tab1');
    } else if (e.target.id === 'inline-radio-2') {
      setSelectedTab2('tab2');
    } else if (e.target.id === 'inline-radio-3') {
      setSelectedTab2('tab3');
    } else {
      setSelectedTab2('tab4');
    }
  };

  // 각 탭에 따른 내용을 정의
  const tabContents = {
    tab1: (

      <div>
        <hr style={{ border: '2px solid #000' }} />
        <p>자산 내용을 여기에 추가.</p>

      </div>
    ),
    tab2: (
      <div>
        <hr style={{ border: '2px solid #000' }} />
        <p>벌금 내용을 여기에 추가.</p>
      </div>
    ),
    tab3: (
      <div>
        <hr style={{ border: '2px solid #000' }} />
        <p>벌칙 내용을 여기에 추가.</p>
      </div>
    ),
    tab4: (
      <div>
        <hr style={{ border: '2px solid #000' }} />
        <p>부동산 내용을 여기에 추가.</p>
      </div>
    ),
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
    <tr onClick={() => { handleShow(); handleCitizenInfo(menu.citizenNumber); }} key={index} style={{ borderTop: '2.5px solid black' }}>
      <td style={{ width: '20%', padding: '10px', fontSize: '20px' }}>
        {menu.citizenNumber}
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


  //랭킹 리스트 가져오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/ranking/list",
      data: {
        nationNum: userData.nationNum,
        type: type,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setLankingList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, [type]);


  return (
    <div style={divStyle} className="border border-dark border-3 p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">{menu}</div>
        <div>국민 관리</div>
      </div>

      {state === 0 ? (
        <div >
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>{citizenInfoItems}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* 라디오 버튼 */}
              <Form>
                <div className="form-check form-check-inline">
                  <Form.Check
                    type="radio"
                    label={<span className="info-label">자산</span>}
                    id="inline-radio-1"
                    checked={selectedTab2 === 'tab1'}
                    onChange={handleInfoTabChange}
                  />
                </div>
                <div className="form-check form-check-inline">
                  <Form.Check
                    type="radio"
                    label={<span className="info-label">벌금</span>}
                    id="inline-radio-2"
                    checked={selectedTab2 === 'tab2'}
                    onChange={handleInfoTabChange}
                  />
                </div>
                <div className="form-check form-check-inline">
                  <Form.Check
                    type="radio"
                    label={<span className="info-label">벌칙</span>}
                    id="inline-radio-3"
                    checked={selectedTab2 === 'tab3'}
                    onChange={handleInfoTabChange}
                  />
                </div>
                <div className="form-check form-check-inline">
                  <Form.Check
                    type="radio"
                    label={<span className="info-label">부동산</span>}
                    id="inline-radio-4"
                    checked={selectedTab2 === 'tab4'}
                    onChange={handleInfoTabChange}
                  />
                </div>
              </Form>

              {tabContents[selectedTab2]}
            </Modal.Body>

          </Modal>
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
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{
                      width: '160px', // 원하는 넓이로 조절
                      marginRight: '10px',
                    }}
                  />
                  <TeacherImmigrantList citizenNumber={inputValue} />
              
              </div>
            ) : (
              <div style={{ marginTop: '20px' }}> {/* 위로 10px만큼 내리기 */}
                {/* 2번 라디오 버튼을 선택한 경우 보여질 내용 */}
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {/* 가운데 정렬 */}
                
                </div>
              </div>
            )}



          </div>
        </div>
      ) : (
        <div style={{ height: "80%" }}>
          <Form style={{ height: "90%" }}>
            <div className="container d-flex justify-content-end" style={{ fontSize: "11px" }}>*자산왕은 항상 전체 기간 기준입니다.</div>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} style={{ textAlign: "left", fontSize: "14px" }}>
                <Form.Check
                  inline
                  label="전체 랭킹"
                  name="type"
                  type={type}
                  id={`inline-${type}-1`}
                  checked={selectedTab === 'tab1'}
                  onChange={handleTabChange}
                />
                <Form.Check
                  inline
                  label="월 랭킹"
                  name="type"
                  type={type}
                  id={`inline-${type}-2`}
                  checked={selectedTab === 'tab2'}
                  onChange={handleTabChange}
                />
              </div>
            ))}
            <div className="container d-flex justify-content-end" style={{ fontSize: "13px" }}>(단위:미소)</div>
            <div className="container d-flex" style={{ height: "100%" }}>

              <div style={divBlock} className="m-2">
                <div className="row justify-content-md-center p-3" style={{ fontSize: "30px" }}>자산왕</div>
                <div className="row justify-content-md-center">
                  {numberOfAsset === 0 ? (
                    <div>
                      기간 내에 자산 있는 국민이 없습니다.
                    </div>
                  ) : (
                    <div>
                      <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                        <div className="col-sm-3 p-1 m-1">등수</div>
                        <div className="col-sm-4 p-1 m-1">이름</div>
                        <div className="col-sm-3 p-1 m-1">총액</div>
                      </div>
                      {rankingList.assetRanking.map((item, index) => (
                        <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                          <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                          <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                          <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={divBlock} className="m-2">
                <div className="row justify-content-md-center p-3" style={{ fontSize: "30px" }}>소비왕</div>
                <div className="row justify-content-md-center">
                  {numberOfConsumption === 0 ? (
                    <div>
                      기간 내에 소비한 국민이 없습니다.
                    </div>
                  ) : (
                    <div>
                      <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                        <div className="col-sm-3 p-1 m-1">등수</div>
                        <div className="col-sm-4 p-1 m-1">이름</div>
                        <div className="col-sm-3 p-1 m-1">총액</div>
                      </div>
                      {rankingList.consumptionRanking.map((item, index) => (
                        <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                          <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                          <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                          <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={divBlock} className="m-2">
                <div className="row justify-content-md-center p-3" style={{ fontSize: "30px" }}>저축왕</div>
                <div className="row justify-content-md-center">
                  {numberOfSaving === 0 ? (
                    <div>
                      기간 내에 저축한 국민이 없습니다.
                    </div>
                  ) : (
                    <div>
                      <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                        <div className="col-sm-3 p-1 m-1">등수</div>
                        <div className="col-sm-4 p-1 m-1">이름</div>
                        <div className="col-sm-3 p-1 m-1">총액</div>
                      </div>
                      {rankingList.savingRanking.map((item, index) => (
                        <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                          <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                          <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                          <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={divBlock} className="m-2">
                <div className="row justify-content-md-center p-3" style={{ fontSize: "30px" }}>벌금왕</div>
                <div className="row justify-content-md-center">
                  {numberOfFine === 0 ? (
                    <div>
                      기간 내에 벌금 낸 국민이 없습니다.
                    </div>
                  ) : (
                    <div>
                      <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                        <div className="col-sm-3 p-1 m-1">등수</div>
                        <div className="col-sm-4 p-1 m-1">이름</div>
                        <div className="col-sm-3 p-1 m-1">총액</div>
                      </div>
                      {rankingList.fineRanking.map((item, index) => (
                        <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                          <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                          <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                          <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </Form>
        </div>
      )}

    </div>
  );
}