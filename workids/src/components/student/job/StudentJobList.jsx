import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";

export default function StudentJobList({ citizenNumber }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const [jobList, setJobList] = useState([]); //직업 항목
  const divListStyle = {
    borderRadius: "20px",
    backgroundColor: "#FEE173",
    border: "solid 5px #F6BE2C"
  }
  const colStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
}
const divvStyle = {
  borderRadius: "40px",
  backgroundColor: "#FFFEEE",
};



  const heightStyle = {
    height: "85%",
    borderRadius: "40px",
    backgroundColor: '#FFFEEE',
  };
  const divStyle = {
    width: "80%",
    height: "80vh",
    borderRadius: "40px",
    backgroundColor: "#FFFEEE",
  };

  //직업리스트 뽑아오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
    }

    axBase(token)({
      method: "post",
      url: "/job/list",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setJobList(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

  }, []);


  return (
    <div>
    <div className="container d-flex justify-content-end">(단위:{userData.moneyName})</div>
    <div className="border border-dark  border-3 p-3" style={{ ...divvStyle, height: "68vh" }}>    {/*중간탭*/}
                        
                       
                         <div className="overflow-auto m-3 p-4 scrollCss " style={{maxHeight:'62vh'}}>

                         <table style={{...colStyle, marginLeft:'auto', marginRight:'auto', width:'90%'}}>
                                {jobList.map((menu, index) => (
                                   <tbody key={index} style={{fontSize:'20px', height:'15vh'}}>
                                        <tr key={`${index}_content`} style={{ borderTop: '3px solid black', padding: '10px' }}>
                                        <td>No. {index + 1}</td>

                                        <td className="fs-4" style={{ width: '20%'}}>직업명 :</td>
                                        <td></td>
                                        <td className="fs-4" style={{ width: '30%'}}>{menu.name}</td>
                                            
                                                <td>
                                                    
                                                </td>
                                            
                                        </tr>
                                        <tr key={`${index}_content`}>
                                       <td></td>
                                        <td className="fs-4" style={{ width: '40%'}}>업무항목 :</td>
                                        <td></td>
                                        <td key={index} className="fs-4">{menu.jobToDoContent}</td>

                                        </tr>
                                        <tr key={`${index}_salary`}>
                                        <td>

                                        </td>
                                        <td className="fs-4" style={{ width: '20%'}}>월급 :</td>
                                        <td></td>
                                        <td key={index} className="fs-4">{menu.salary}</td>

                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                       
                        
                    </div>
                    </div>
                    </div>
                    
                  
  );
}