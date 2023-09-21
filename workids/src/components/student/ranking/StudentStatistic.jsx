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
  const [monthly, setMonthly] = useState([]);
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
  const [monthlyState, setMonthlyState] = useState({
    series: [],
    options: {
      chart: {
        type: "line",
      },
      labels: [],
      title: {
        text: "월별 수입 지출 통계",
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
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setAsset(response.data.data.asset);
        setExpend(response.data.data.expend);
        setIncome(response.data.data.income);
        setIncomeExpend(response.data.data.incomeExpend);
        setMonthly(response.data.data.monthly);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    console.log("monthly", monthly);
    if (!loading && asset) {
      console.log("2실행");
      const assetUpdate = {
        series: asset.percent,
        options: {
          chart: {
            type: "pie",
            fontFamily: "KCC-Ganpan",
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
            fontFamily: "KCC-Ganpan",
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
            fontFamily: "KCC-Ganpan",
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
            fontFamily: "KCC-Ganpan",
            type: "pie",
          },
          labels: incomeExend ? incomeExend.menu : [],
          title: {
            text: "수입 지출 비율",
            align: "center",
          },
        },
      };
      const monthlyUpdate = {
        chart: {
          height: 350,
          type: "line",

          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        series: monthly
          ? [
              { name: "수입", data: monthly.income },
              { name: "지출", data: monthly.expend },
            ]
          : [],
        options: {
          chart: {
            height: 350,
            type: "line",
            fontFamily: "KCC-Ganpan",

            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
            },
          },
          colors: ["#77B6EA", "#545454"],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "smooth",
          },
          title: {
            text: "월별 수익 지출 내역",
            align: "center",
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          markers: {
            size: 1,
          },
          xaxis: {
            categories: monthly ? monthly.month : [],
            title: {
              text: "Month",
            },
          },
          yaxis: {
            title: {
              text: "금액",
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        },
      };
      console.log(monthly.month);
      setAssetState(assetUpdate);
      setExpendState(expendUpdate);
      setIncomeState(incomeUpdate);
      setIncomeExpendState(incomeExpendUpdate);
      setMonthlyState(monthlyUpdate);
      setLoading2(false);
    }
  }, [loading, asset]);

  return (
    <div className="h-100">
      {loading2 ? (
        <div>로딩 중</div>
      ) : (
        <div className="h-100">
          <div className="d-flex justify-content-center border" style={{ height: "40%" }}>
            <div className="m-auto">
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
            <div className="m-auto">
              {expend ? (
                <div>
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
            <div className="m-auto">
              {income ? (
                <div>
                  <Chart
                    options={incomeState.options}
                    series={incomeState.series}
                    type="pie"
                    width="300"
                  />
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  수입이 없습니다.
                </div>
              )}
            </div>
            <div className="m-auto">
              {incomeExend ? (
                <div>
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
          <div className="h-50">
            <div className="d-flex justify-content-center">
              <Chart
                options={monthlyState.options}
                series={monthlyState.series}
                type="line"
                width={1000}
                height={300}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
