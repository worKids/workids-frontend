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
import immigrantItems from './TeacherImmigrantList';


export default function TeacherCitizen() {
  const [show, setShow] = useState(false);
  const citizenMenu = ["국민 조회", "신용도 관리", "이민자 관리", "통계 조회"];
  const [state, setState] = useState(0);//버튼 클릭
  const [userData, setUserData] = useRecoilState(userState);

  const [citizenList, setCitizenList] = useState([]); //국민 항목
  const [creditRatingList, setCreditRatingList] = useState([]); //국민 항목
  const navigate = useNavigate();
  const divStudentList = {
    width: "90%",
    fontSize: "18px",
    textAlign: "center",
    borderRadius:"40px",
    backgroundColor: '#FEE173',
    height: "38.5vh"
}
const heightStyle = {
  height: "85%",
  borderRadius: "40px",
  backgroundColor: '#FFFEEE',
};

  const [inputValue, setInputValue] = useState("0"); // 입력한 값을 상태로 관리합니다.
  const [rankingList, setLankingList] = useState({ assetRanking: [], consumptionRanking: [], savingRanking: [], fineRanking: [] });
  const numberOfAsset = rankingList.assetRanking.length;
  const numberOfConsumption = rankingList.consumptionRanking.length;
  const numberOfSaving = rankingList.savingRanking.length;
  const numberOfFine = rankingList.fineRanking.length;
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [selectedTab2, setSelectedTab2] = useState('tab1'); // 초기 탭 설정
  const [type, setType] = useState('t');
  const [penaltyStudentList, setPenaltyStudentList] = useState([]); //벌칙 부여 항목
  const [fineStudentList, setFineStudentList] = useState([]); //벌금 부여 항목
  const [aucList, setAucList] = useState([]);
  const [bankMainList, setBankMainList] = useState([]); // 주거래 계좌 목록
  const [bankDepositList, setBankDepositList] = useState([]); // 예금 계좌 목록
  const hrStyle = {
    width: "100%",
    height: "5px",
    backgroundColor: "black",
    margin : "4px"
  }
  const divListStyle = {
    borderRadius: "40px",
    backgroundColor: "#fffeee",
    height: "85%"
}
  const divvStyle = {
    borderRadius: "40px",
    backgroundColor: "#FEE173",
  };
  
  const colStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
}




  const handleNumber = (citizenNumber) => {


    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    // 주거래 계좌
    axBase(token)({
      method: "post",
      url: "/student/bank/main/list",
      data: {
        nationStudentNum: citizenNumber,
      },
    })
      .then((response) => {
        setBankMainList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    // 예금 계좌
    axBase(token)({
      method: "post",
      url: "/student/bank/deposit/list",
      data: {
        nationStudentNum: citizenNumber,
      },
    })
      .then((response) => {
        setBankDepositList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });


    //부과된 벌칙 리스트
    axBase(token)({
      method: "post",
      url: "/student/law/penalty/list",
      data: {
        nationStudentNum: citizenNumber,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setPenaltyStudentList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    //부과된 벌금 리스트

    axBase(token)({
      method: "post",
      url: "/student/law/fine/list",
      data: {
        nationStudentNum: citizenNumber,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setFineStudentList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    //부과된 부동산 리스트
    axBase(token)({
      method: "post",
      url: "/student/auction/list",
      data: {
        nationNum: userData.nationNum,
        nationStudentNum: citizenNumber,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setAucList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  };

  //주거래 리스트
  const showMainBankList = (
    (bankMainList.length === 0)
      ?
      <div className="info-label h-100 d-flex justify-content-center align-items-center">
        주거래 계좌가 없습니다!
      </div>
      :
      bankMainList.map((bank, index) => (

        <div key={index}>
          <div className="info-label row m-2 text-center p-2 ">
            {/* <div className="col d-flex justify-content-center align-items-center">
                {index + 1}
            </div> */}
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.accountNumber}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productName}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.balance}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.interestRate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.endDate}
            </div>

            <div className="col-2 d-flex justify-content-center align-items-center">
            </div>
          </div>
        </div>
      ))
  )

  // 예금 계좌
  const showDepositBankList = (
    (bankDepositList.length === 0)
      ?
      <div className="info-label h-100 d-flex justify-content-center align-items-center">
        예금 계좌가 없습니다!
      </div>
      :
      bankDepositList.map((bank, index) => (

        <div key={index}>
          <div className="info-label row m-2 text-center p-2 ">
            {/* <div className="col d-flex justify-content-center align-items-center">
              {index + 1}
          </div> */}
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.accountNumber}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.productName}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {bank.balance}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {bank.interestRate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {bank.endDate}
            </div>


          </div>
        </div>
      ))
  )


  //부여된 벌칙 출력
  const PenaltyItems = (
    (penaltyStudentList.length === 0)
      ?
      <div className="info-label h-100 d-flex justify-content-center align-items-center">
        벌칙 내역이 없습니다!
      </div>
      :
      penaltyStudentList.map((item, index) => (


        <div key={index} className="info-label row m-2 text-center p-2" >
          <div className="col-2 p-3">{index + 1}</div>
          <div className="col-2 p-3">{item.content}</div>
          <div className="col-2 p-3">{item.penalty}</div>
          <div className="col-2 p-3">{item.createdDate}</div>
          {item.penaltyCompleteState === 0 && (
            <div className="col-2 p-3">미수행</div>
          )}
          {item.penaltyCompleteState === 1 && (
            <div className="col-2 p-3">수행</div>
          )}
          <hr></hr>
        </div>

      ))
  )



  //부여된 벌금 출력
  const FineItems = (
    (fineStudentList.length === 0)
      ?
      <div className="info-label h-100 d-flex justify-content-center align-items-center">
        벌금 내역이 없습니다!
      </div>
      : fineStudentList.map((item, index) => (

        <div key={index} className="info-label row m-2 text-center p-2" >
          <div className="col-3 p-4">{index + 1}</div>
          <div className="col-3 p-4">{item.content}</div>
          <div className="col-3 p-4">{item.fine}</div>
          <div className="col-3 p-4">{item.createdDate}</div>
          <hr></hr>
        </div>
      ))
  )

  //부여된 부동산 출력
  const auctionList =
    aucList !== null ? (
      aucList.map((menu, index) => (
        <div key={index}>
          <div className="info-label row text-center my-4 fs-5">
            <div className="col-2 d-flex justify-content-center align-items-center">
              {index + 1}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.createdDate}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.seatNumber}
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.submitPrice}
            </div>

            {menu.resultType === 0 ? (
              <div className="col-2 d-flex justify-content-center align-items-center">미참여</div>
            ) : menu.resultType === 1 ? (
              <div className="col-2 d-flex justify-content-center align-items-center">낙찰</div>
            ) : (
              <div className="col-2 d-flex justify-content-center align-items-center">미낙찰</div>
            )}

            <div className="col-2 d-flex justify-content-center align-items-center">
              {menu.resultSeat}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="info-label h-100 d-flex justify-content-center align-items-center">
        생성된 경매가 없습니다!
      </div>
    );




  const divBlock = {
    display: "inline-block",
    borderRadius: "25px",
    width: "25%",
    backgroundColor: '#fffeee'
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

  const handleCreditRatingChange = (e, index) => {
    const updatedCreditRatingList = [...creditRatingList];
    updatedCreditRatingList[index].creditRating = e.target.value;
    setCreditRatingList(updatedCreditRatingList);
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
    height: "80vh",
    borderRadius: "40px",
    backgroundColor: "#FFFEEE",
  };

  //직업 메뉴의 탭들
  const menu = citizenMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => clickMenu(index)}
      className={`menu-button ${state === index ? "bg-warning text-white" : ""
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
        {/* <p>자산 내용을 여기에 추가.</p> */}
        <div>
          <div className="info-label">주거래 계좌</div>
          <div className="row m-2 text-center p-2 ">
            {/* <div className="col">번호</div> */}
            <div className="info-label col-2">계좌번호</div>
            <div className="info-label col-2">상품명</div>
            <div className="info-label col-2"><div>잔액</div><div>(미소)</div></div>
            <div className="info-label col-2"><div>이자율</div><div>(%)</div></div>
            <div className="info-label col-2">개설일</div>
            <div className="info-label col-2">만기일</div>

          </div>
          <div className="container overflow-auto" style={{ height: "10vh", backgroundColor: '#FFEFD5', borderRadius: "20px" }}>
            {showMainBankList}
          </div>
        </div>
        <div>
          <div className="info-label">예금 계좌</div>
          <div className="row m-2 text-center p-2 ">
            {/* <div className="col">번호</div> */}
            <div className="info-label col-2">계좌번호</div>
            <div className="info-label col-2">상품명</div>
            <div className="info-label col-2"><div>잔액</div><div>(미소)</div></div>
            <div className="info-label col-2"><div>이자율</div><div>(%)</div></div>
            <div className="info-label col-2">개설일</div>
            <div className="info-label col-2">만기일</div>

          </div>
          <div className="container overflow-auto" style={{ height: "25vh", backgroundColor: '#FFEFD5', borderRadius: "20px" }}>
            {showDepositBankList}
          </div>
        </div>



      </div>
    ),
    tab2: (
      <div>

        <div>
          <hr style={{ border: '2px solid #000' }} />
          {/* <p>벌금 내용을 여기에 추가.</p> */}
          <div className="info-label row m-2 text-center p-3 ">
            <div className="col-3">No</div>
            <div className="col-3">법 항목</div>
            <div className="col-3">벌금</div>
            <div className="col-3">부과일</div>
          </div>
          <div className="container overflow-auto" style={{ height: "52vh", backgroundColor: '#FFEFD5', borderRadius: "20px" }}>
            {FineItems}
          </div>

        </div>

      </div>
    ),
    tab3: (

      <div>
        <hr style={{ border: '2px solid #000' }} />
        {/* <p>벌칙 내용을 여기에 추가.</p> */}
        <div className=" info-label row m-2 text-center p-3">
          <div className="col-2">No</div> {/* 너비 1 */}
          <div className="col-2">법 항목</div> {/* 너비 3 */}
          <div className="col-2">벌칙</div> {/* 너비 2 */}
          <div className="col-2">부과일</div> {/* 너비 2 */}
          <div className="col-2">수행여부</div> {/* 너비 2 */}

        </div>
        <div className="container overflow-auto" style={{ height: "52vh", backgroundColor: '#FFEFD5', borderRadius: "20px" }}>
          {PenaltyItems}
        </div>


      </div>
    ),
    tab4: (
      <div>
        <hr style={{ border: '2px solid #000' }} />
        {/* <p>부동산 내용을 여기에 추가.</p> */}
        <div className="info-label row m-2 text-center p-3 ">
          <div className="col-2">No</div>
          <div className="col-2">경매 날짜</div>
          <div className="col-2">신청번호</div>
          <div className="col-2">금액</div>
          <div className="col-2">결과</div>
          <div className="col-2">배정된 번호</div>
        </div>
        <div className="container overflow-auto" style={{ height: "52vh", backgroundColor: '#FFEFD5', borderRadius: "20px" }}>
          {auctionList}
        </div>

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
    <div onClick={() => { handleShow(); handleNumber(menu.citizenNumber); handleCitizenInfo(menu.citizenNumber); }} key={index} className="row justify-content-md-center hoverable" style={{ fontSize: "25px", textAlign: "center" }}>
      <div className="col-2">{menu.citizenNumber}</div>
      <div className="col-2">{menu.studentName}</div>
      <div className="col-2">{menu.name}</div>
      <div className="col-2">{menu.asset}</div>
      <div className="col-2">{menu.credit_rating}</div>
      <div><hr></hr></div>
    </div>
  ));




  //신용도관리 출력화면
  const creditRatingItems = creditRatingList.map((menu, index) => (
    <div key={index} className="row justify-content-md-center" style={{ fontSize: "25px", textAlign: "center" }}>
   <div className="col-2">{menu.citizenNumber}</div>
   <div className="col-3">{menu.studentName}</div>

   <div className="col-3">
    <input
      type="number"
      min={0}
      max={100}
      step={1}
      value={menu.creditRating}
      onChange={(e) => handleCreditRatingChange(e, index)}
    />
  </div>
  <div className="col-3">
    <TeacherCreditRatingUpdate citizenNumber={menu.citizenNumber} creditRating={menu.creditRating} />
  </div>
  <div><hr></hr></div>
</div>
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
    <div style={divStyle} className="border border-dark mt-4 border-3 p-3" > {/*가장 바깥쪽 DIV*/}

      <div className="d-flex justify-content-between">
        <div className="d-flex">{menu}</div>                              {/*메뉴탭*/}
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



          <div className="border border-dark  border-3 p-3" style={{ ...divvStyle, height: "65vh" }}>    {/*중간탭*/}
            <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
            <div className="border border-dark  border-3 p-3" style={heightStyle}>

              <div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-2">번호</div>
                <div className="col-2">이름</div>
                <div className="col-2">직업</div>
                <div className="col-2">자산</div>
                <div className="col-2">신용도</div>
              </div>
              
              <div style={hrStyle}></div>
              <div className="my-3 scrollCss" style={{ overflowX: 'hidden', overflowY: 'auto', height: '55vh' }}>

                {citizenItems}
              </div>
            </div>
          </div>
        </div>





      ) : state === 1 ? (

        <div className="border border-dark  border-3 p-3" style={{ ...divvStyle, height: "65vh" }}>    {/*중간탭*/}
        <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
        <div className="border border-dark  border-3 p-3" style={heightStyle}>
            
             
              <div className="row justify-content-md-center p-1" style={{ fontSize: "30px", textAlign: "center" }}>
                <div className="col-2">번호</div>
                  <div className="col-3">이름</div>
                  <div className="col-3">신용도</div>
                  <div className="col-3"></div>
                </div>
                <div style={hrStyle}></div>
                <div className="my-3 scrollCss" style={{ overflowX: 'hidden', overflowY: 'auto', height: '55vh' }}>
                  {creditRatingItems}
                </div>
              </div>
            </div>
          
        
      ) : state === 2 ? (

        <div>
          <div>
            <div className="d-flex alignItems-center px-3">
              <div style={{ marginRight: '10px', marginTop: '20px' }}> {/* marginTop 추가 */}
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={radioValue === 'option1'}
                  onChange={handleRadioChange}
                  style={{
                    width: '10px',
                    height: '10px',
                  }}
                />
                <label htmlFor="option1" className="px-2" style={{ fontSize: '20px' }}>국적취득신고</label>
              </div>
              <div style={{marginTop: '20px' }}> {/* marginTop 추가 */}
                <input
                  type="radio"
                  id="option2"
                  value="option2"
                  checked={radioValue === 'option2'}
                  onChange={handleRadioChange}
                  style={{
                    width: '10px',
                    height: '10px',
                  }}
                />
                <label htmlFor="option1" className="px-2" style={{ fontSize: '20px' }}>국적이탈신고</label>
              </div>
            </div>



            {radioValue === 'option1' ? (
            <div>  
              <div className="d-flex justify-content-center align-items-center my-2">
                <div className="fs-4 p-2 mx-5">학급 번호 :</div>
                <div style={{ textAlign: 'center' }}> {/* 위로 10px만큼 내리기 및 오른쪽 정렬 */}
                  {/* 1번 라디오 버튼을 선택한 경우 보여질 내용 */}
                  <input
                      type="number"
                      value={inputValue}
                      onChange={handleInputChange}
                      style={{
                          width: '160px', // 원하는 넓이로 조절
                      }}
                  />
                </div>
              </div>
              <div>
              <TeacherImmigrantList citizenNumber={inputValue} />
              </div>
            </div>

          
            ) : (

          <div>  
          <div className="d-flex justify-content-center align-items-center my-2">
            <div className="fs-4 p-2 mx-5">학급 번호 :</div>
            <div style={{ textAlign: 'center' }}> {/* 위로 10px만큼 내리기 및 오른쪽 정렬 */}
              {/* 1번 라디오 버튼을 선택한 경우 보여질 내용 */}
              <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{
                      width: '160px', // 원하는 넓이로 조절
                  }}
              />
            </div>
          </div>
          <div>
          <TeacherImmigrantList2 citizenNumber={inputValue} />
          </div>
          </div>
              
            )}



          </div>
        </div>
      ) : (
        <div className="border border-dark  border-3 p-3" style={{ ...divvStyle, height: "65vh" }}>
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
            <div className="container d-flex justify-content-end" style={{ fontSize: "13px" }}>(단위:{userData.moneyName})</div>
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