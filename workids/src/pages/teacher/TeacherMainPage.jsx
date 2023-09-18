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
 
  const [activeTab, setActiveTab] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true); // 버튼 비활성화 상태


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
      url: "/nation/list",
      data: {
        nationNum: userData.nationNum,
        totalStudent: userData.totalStudent,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        const nationList = response.data.data;
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

 
  return (
    <div className="h-100">
    <TeacherTopNav />
    <div className="d-flex h-75">
      <TeacherSideNav />
      <div className="d-flex" style={divStyle}>
        <div className="w-50 p-3">
          <div className="border border-dark border-3 m-3 p-3 bg-white" style={borderRound}>
          <div style={{ fontSize: '25px', textAlign: 'center'}}>{userData.nationName} 나라  </div>
            <br/>
            화폐명:        세율:  % <br/>
            운영시작일:           <br/>
            운영종료일: 
          </div>
          <div className="border border-dark border-3 m-3 p-3 bg-white" style={borderRound}>
            국민 수:  {userData.totalStudent}  명
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
                    Content for Tab 1
                  </div>
                  <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} 
                  
                  >
                    Content for Tab 2
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
 