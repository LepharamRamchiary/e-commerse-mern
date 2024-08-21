import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale
);

const Clv = () => {
  const [clvData, setClvData] = useState([]);

  useEffect(() => {
    const fetchCLVData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/customers/clv-by-cohorts"
        );
        setClvData(response.data);
      } catch (error) {
        console.error("Error fetching CLV data", error);
      }
    };

    fetchCLVData();
  }, []);

  if (!clvData || clvData.length === 0) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const chartData = {
    labels: clvData.map((item) => `${item.month}/${item.year}`),
    datasets: [
      {
        label: "Cohort CLV",
        data: clvData.map((item) => item.cohortCLV),
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
        fill: true,
      },
      {
        label: "Customer Count",
        data: clvData.map((item) => item.customerCount),
        backgroundColor: "rgba(255,159,64,0.4)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="md:p-6 p-2">
      <a className="underline cursor-pointer" href="/">
        Go Back
      </a>
      <Line data={chartData} />
    </div>
  );
};

export default Clv;
