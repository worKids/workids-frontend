import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import "../../../index.css";
export default function StudentStatistic() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [asset, setAsset] = useState([]);
  const [expend, setExpend] = useState([]);
  const [income, setIncome] = useState([]);
  const [incomeExend, setIncomeExpend] = useState([]);
  const [assetState, setAssetState] = useState({
    series: [],
    options: {
      chart: {
        fontFamily: "KCC-Ganpan",
        type: "pie",
      },
      labels: [],
      title: {
        text: "자산 비율",
        align: "center",
      },
    },
  });
  const [expendState, setExpendState] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      title: {
        text: "소비 비율",
        align: "center",
      },
    },
  });
  const [incomeState, setIncomeState] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      title: {
        text: "수입 비율",
        align: "center",
      },
    },
  });
  const [incomeExpendState, setIncomeExpendState] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      title: {
        text: "수입 지출 비율",
        align: "center",
      },
    },
  });
  // 화면 첫 렌더링
  useEffect(() => {
    console.log("1실행");
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
      return;
    }
    axBase(token)({
      method: "post",
      url: "/student/statistic",
      data: {
        nationStudentNum: userData.nationStudentNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setAsset(response.data.data.asset);
        setExpend(response.data.data.expend);
        setIncome(response.data.data.income);
        setIncomeExpend(response.data.data.incomeExpend);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    console.log("incomeExpend", incomeExend);
    if (!loading && asset) {
      console.log("2실행");
      const assetUpdate = {
        series: asset.percent,
        options: {
          chart: {
            type: "pie",
          },
          labels: asset.menu,
          title: {
            text: "자산 비율",
            align: "center",
          },
        },
      };
      const expendUpdate = {
        series: expend ? expend.percent : [],
        options: {
          chart: {
            type: "pie",
          },
          labels: expend ? expend.menu : [],
          title: {
            text: "소비 비율",
            align: "center",
          },
        },
      };
      const incomeUpdate = {
        series: income ? income.percent : [],
        options: {
          chart: {
            type: "pie",
          },
          labels: income ? income.menu : [],
          title: {
            text: "수입 비율",
            align: "center",
          },
        },
      };
      const incomeExpendUpdate = {
        series: incomeExend ? incomeExend.percent : [],
        options: {
          chart: {
            type: "pie",
          },
          labels: incomeExend ? incomeExend.menu : [],
          title: {
            text: "수입 지출 비율",
            align: "center",
          },
        },
      };
      setAssetState(assetUpdate);
      setExpendState(expendUpdate);
      setIncomeState(incomeUpdate);
      setIncomeExpendState(incomeExpendUpdate);
      setLoading2(false);
    }
  }, [loading, asset]);

  return (
    <div className="h-100">
      {loading2 ? (
        <div>로딩 중</div>
      ) : (
        <div className="h-100">
          <div className="row h-50 border">
            <div className="col-3" style={{ height: "500px" }}>
              {asset ? (
                <div>
                  <Chart
                    options={assetState.options}
                    series={assetState.series}
                    type="pie"
                    width="300"
                  />
                </div>
              ) : (
                <div>자산이 존재하지 않습니다.</div>
              )}
            </div>
            <div className="col-3" style={{ height: "500px" }}>
              {expend ? (
                <div className="col-3">
                  <Chart
                    options={expendState.options}
                    series={expendState.series}
                    type="pie"
                    width="300"
                  />
                </div>
              ) : (
                <div>소비를 하지 않았습니다.</div>
              )}
            </div>
            <div className="col-3 m-auto" style={{ height: "500px" }}>
              {income ? (
                <div className="col-3">
                  <Chart
                    options={incomeState.options}
                    series={incomeState.series}
                    type="pie"
                    width="300"
                  />
                </div>
              ) : (
                <div>수입이 없습니다.</div>
              )}
            </div>
            <div className="col-3 m-auto" style={{ height: "500px" }}>
              {incomeExend ? (
                <div className="col-3">
                  <Chart
                    options={incomeExpendState.options}
                    series={incomeExpendState.series}
                    type="pie"
                    width="300"
                  />
                </div>
              ) : (
                <div>수입과 지출이 없습니다.</div>
              )}
            </div>
          </div>
          <div className="h-50">차트칸</div>
        </div>
      )}
    </div>
  );
}
