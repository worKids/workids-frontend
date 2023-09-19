import React, { useEffect , useState} from "react"; 
import TeacherTopNav from "../../components/teacher/TeacherTopNav";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import { axBase } from "../../apis/axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
export default function TeacherMainPage() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate(); 
  const divStyle = {
    width: "80%",
  };
  const borderRound = {
    borderRadius: "40px",
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

    <div key={index} className="row justify-content-md-center p-1" style={{fontSize:"15px", textAlign:"center"}}>
      <div className="col-1 p-2">{index+1}.</div>
      <div className="col-4 p-2">{item.content}</div>   
      <hr></hr>
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
        <div className="w-50 p-3">
          <div className="border border-dark border-3 m-3 p-3 bg-white" style={borderRound}>
          <div style={{ display: 'grid', gridTemplateRows: '2fr 1fr 1fr', gridTemplateColumns: '1fr 4fr', gap: '10px'}}>
            <div style={{ fontSize: '25px', textAlign: 'center', gridColumn: 'span 2'}}>
              {userData.nationName} 나라
            </div> 
            <div> 화폐명: </div>
            <div> {nationMainInfo.moneyName} </div>
            <div> 세율: </div>
            <div> {nationMainInfo.taxRate} % </div>
            <div> 운영시작일: </div>
            <div> {nationMainInfo.startDate} </div>
            <div> 운영종료일: </div>
            <div> {nationMainInfo.endDate} </div> 
          </div> 
        </div>
          <div className="border border-dark border-3 m-3 p-3 bg-white" style={borderRound}>
            국민 수:  {nationMainInfo.totalCitizen}  명
          </div> 
        </div>
        <div className="w-50 p-3"> 
        <div className="border border-dark border-3 m-3 p-3 bg-white" style={borderRound}>  
              <div>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                      onClick={() => handleTabClick(1)}  
                      style={{
                        color: activeTab === 1 ? '#f8d71d' : 'black',
                      }}  
                    >
                      {userData.nationName} 나라의 법
                    </button> 
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                      onClick={() => handleTabClick(2)}  
                      style={{
                        color: activeTab === 2 ? '#f8d71d' : 'black',
                      }} 
                    >  
                      {userData.nationName} 나라의 직업
                    </button>
                  </li>
                </ul>
                <div className="border border-dark  border-3 m-2 p-3 bg-warning" style={borderRound}>
                <div className="tab-content">
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
 