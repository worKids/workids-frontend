import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";  
 
export default function TeacherNation(){ 
    const nationInfoMenu = ["나라 정보", "나라 정보 수정", "학급번호 연결"];
    const [state, setState] = useState(2);//버튼 클릭
    const userData = useRecoilValue(userState);  
    const [nationInfo, setNationInfo] = useState([]); 
    const [citizenList, setCitizenList] = useState([]); 
    const navigate = useNavigate();
    const [showCitizenList, setShowCitizenList] = useState(false);

    const clickMenu = (idx) => {
        setState(idx);
        onReset();
        if(idx===1){
            setCheckedItems(initialCheckedItems); //checkbox 초기 설정
        }
      };

    const divStyle = {
    width: "80%",
    borderRadius: "40px",
    };

    const borderRound = {
        borderRadius: "40px",
        textAlign: 'center',
    };

    const btn = {
        borderRadius: "30px", 
        backgroundColor: 'white', 
        color: 'black',
        marginRight: '10px'
    };

 

    const navigateToCitizenCreate = () => {
        setShowCitizenList(true); // 버튼 클릭 시 상태 변경
        navigate("/teacher/citizenCreate");
      };
    
    const navigateToCitizenList = () => {
        setShowCitizenList(false); // 버튼 클릭 시 상태 변경
        navigate("/teacher/citizen/list");
      };
 
  
    const menu = nationInfoMenu.map((menu, index) => (
        <div
          key={index}
          onClick={() => clickMenu(index)}
          className={`m-2 border border-dark  border-3 text-center p-3 rounded-pill ${
            state === index ? "bg-warning text-white" : ""
          }`}
        >
          {menu}
        </div>
    ));

    const handleSaveChanges = () => {
        // 변경된 내용을 저장하는 로직을 추가
        const token = userData.accessToken;
        if (!token) {
          navigate("/");
          return;
        }
    
        axBase(token)({
          method: "patch",
          url: "/nation", // 변경 내용 저장 엔드포인트
          data: { 
            // 변경된 내용을 서버로 전송
            nationNum: userData.nationNum,
            name: nationInfo.name,
            moneyName: nationInfo.moneyName,
            taxRate: nationInfo.taxRate,
            presidentName: nationInfo.presidentName,
            payDay: nationInfo.payDay,
            state: nationInfo.state,
            startDate: nationInfo.startDate,
            endDate: nationInfo.endDate,
          },
        })
          .then((response) => {
            console.log("변경된 내용이 성공적으로 저장되었습니다.");
            alert("변경된 내용이 성공적으로 저장되었습니다.");
          })
          .catch((err) => {
            console.log("변경된 내용 저장 중 오류가 발생했습니다.", err.response.data.message);
          });
      };
 
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        console.log(userData.nationNum); 

        axBase(token)({
            method: "post",
            url: "/teacher/nation/citizen",
            data: { 
                num: userData.nationNum,
            },
            }) 
            .then((response) => {
                console.log(response.data.data); 
                setCitizenList(response.data.data); // 상태 업데이트   
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    }, []);
 

    //국민 목록 출력
    const CitizenItems = citizenList.map((item,index)=>(

        <div key={index} className="row justify-content-md-center p-1 overflow-auto" style={borderRound}>
        <div className = "row"> 
        <div className="col-4 p-2">{item.citizenNumber}</div>
        <div className="col-4 p-2">{item.studentName}</div>   
        <div className="col-4 p-2">{item.birthDate}</div>   
        </div>
        <hr></hr>
        </div>
    ));
 

    return ( 
  
        (citizenList.length === 0)
        ?
        <div style={divStyle} className="border border-dark  border-3 p-3">
        <div className="d-flex justify-content-between">
            <div className="d-flex">{menu}</div>
            <div>나라 정보</div>
        </div> 
            <div className="border border-dark  border-3 m-5 p-5 bg-warning" style={borderRound}> 
            <p>국민 목록 설정이 되어있지 않습니다.</p>
            <p>국민 목록을 설정해주세요 ~ !</p>
            <p/>
            {navigateToCitizenCreate ? (
            <button className="btn btn-primary" onClick={navigateToCitizenCreate} style={btn}>국민 목록 설정하기</button>
            ) : null}
            </div> 
      </div>
        :
        <div style={divStyle} className="border border-dark  border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                    <div>나라 정보</div>
                </div> 
                    <div className="border border-dark  border-3 m-5 p-5 bg-white" style={borderRound}> 
                    <div className = "row"> 
                        <div className="col-4 p-2">학급 번호</div>
                        <div className="col-4 p-2">학생 이름</div>   
                        <div className="col-4 p-2">생년월일</div>  
                    </div> 
                        <hr></hr> 
                        {CitizenItems}
                        <p/>  
  
            </div> 
            </div>
    );
}