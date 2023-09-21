import React, { useEffect , useState} from "react"; 
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import { axBase } from "../../apis/axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import "../../index.css"
export default function TeacherMainPage() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate(); 
  const divStyle = {
    width: "80%",
  };
  const borderRound = {
    borderRadius: "40px",
  };

  const lawScroll = {
    borderRadius: "40px",
    maxHeight: "27vh"
  };
  const infoMargin = {
    marginRight: '30px',
  };

  const [activeTab, setActiveTab] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true); // 버튼 비활성화 상태

  const [nationMainInfo, setNationMainInfo] = useState([]); 
  const [lawList, setLawList] = useState([]); 
  const [jobList, setJobList] = useState([]); 

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber); 
  };
  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/teacher/nation",
      data: {
        num: userData.nationNum, 
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setNationMainInfo(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  //법 항목 리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
        navigate("/");
    }

    axBase(token)({
    method: "post",
    url: "/teacher/nation/law",
    data: {
        num: userData.nationNum,
    },
    })
    .then((response) => {
        console.log(response.data.data);
        setLawList(response.data.data);
    })
    .catch((err) => {
        alert(err.response.data.message);
    });

}, []);

  //법 항목 출력
  const LawItems = lawList.map((item,index)=>(

    <div key={index} className="row fs-5 px-3" style={{fontSize:"15px"}}>
      <div className="col-1 p-1 ms-2">{index+1}.</div>
      <div className="col-7 p-1 ms-3">{item.content}</div>   
    </div>
  ));

  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }
    axBase(token)({
      method: "post",
      url: "/teacher/nation/job",
      data: {
        num: userData.nationNum, 
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setJobList(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  //직업 항목 출력
  const JobItems = jobList.map((item,index)=>(

    <div key={index} className="row justify-content-md-center p-1" style={{fontSize:"15px", textAlign:"center"}}>
      <div className="col-1 p-2">{index+1}.</div>
      <div className="col-4 p-2">{item.name}</div>   
      <hr></hr>
    </div>
  ));



 
  return (
    <div className="h-100">
    <TeacherTopNav />
    <div className="d-flex h-75">
      <TeacherSideNav />
      <div className="d-flex" style={divStyle}>
        <div className="w-50">
          <div className="border border-dark border-3 m-3 p-3" style={{...borderRound, backgroundColor:"#FFFEEE"}}>
          <div className="fs-5" >
            <div className="fs-3 mb-2" style={{ textAlign: 'center', gridColumn: 'span 2'}}>
              {userData.nationName} 나라
            </div> 
            <div className="d-flex justify-content-around">
            <div className="d-flex">
            <div> 화폐명 </div>
            <div className="mx-2">:</div>
            <div> {nationMainInfo.moneyName} </div>
            </div>
            <div className="d-flex">
            <div> 세율</div>
            <div className="mx-2">:</div>
            <div> {nationMainInfo.taxRate} % </div>
            </div>
            </div>
            <div className="d-flex justify-content-around">
            <div> 운영시작일: </div>
            <div> {nationMainInfo.startDate} </div>
            </div>
            <div className="d-flex justify-content-around">
            <div> 운영종료일: </div>
            <div> {nationMainInfo.endDate} </div> 
            </div>
          </div> 
        </div>
          <div className="border border-dark border-3 m-3 p-4 fs-4 text-center" style={{...borderRound, backgroundColor:"#FFFEEE"}}>
            국민 수:  {nationMainInfo.totalCitizen}  명
          </div> 
        </div>
        <div className="w-50"> 
        <div className="border border-dark border-3 m-3 p-3" style={{...borderRound, backgroundColor:"#FFFEEE"}}>  
              <div>
                <ul className="nav nav-tabs">
                  <li className="nav-item ms-4" style={{width:"45%"}}>
                    <button
                      className={`nav-link fs-5 ${activeTab === 1 ? 'active' : ''}`}
                      onClick={() => handleTabClick(1)}  
                      style={{
                        color: activeTab === 1 ? '#FEC700' : 'black',
                      }}  
                    >
                      {userData.nationName} 나라의 법
                    </button> 
                  </li>
                  <li className="nav-item" style={{width:"45%"}}>
                    <button
                      className={`nav-link fs-5 ${activeTab === 2 ? 'active' : ''}`}
                      onClick={() => handleTabClick(2)}  
                      style={{
                        color: activeTab === 2 ? '#FEC700' : 'black',
                      }} 
                    >  
                      {userData.nationName} 나라의 직업
                    </button>
                  </li>
                </ul>
                <div className="border border-dark  border-3 m-2 p-3 mt= bg-warning overflow-auto hiddenScoll" 
                style={lawScroll}
               >
                <div className="tab-content" >
                  <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`} 
                  > 
                  {lawList.length === 0 ? "등록된 법이 없습니다." : LawItems}  
                
                  </div>
                  <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} 
                  
                  >  
                  {jobList.length === 0 ? "등록된 직업이 없습니다." : JobItems}

                  </div> 
                </div>
                </div>
              </div> 
              </div>
        </div> 
        </div>
      </div>
    </div>
  );
} 
 