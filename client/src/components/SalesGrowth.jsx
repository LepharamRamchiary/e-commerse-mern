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

const SalesGrowth = () => {
  const [growthData, setGrowthData] = useState([]);
  const [interval, setInterval] = useState("monthly");

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/sales/sales-growth-rate?interval=${interval}`
        );
        setGrowthData(response.data);
      } catch (error) {
        console.error("Error fetching sales growth rate data", error);
      }
    };

    fetchGrowthData();
  }, [interval]);

  if (!growthData || growthData.length === 0) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const chartData = {
    labels: growthData.map((item) => {
      if (interval === "daily") {
        return `${item._id.day}/${item._id.month}/${item._id.year}`;
      } else if (interval === "monthly") {
        return `${item._id.month}/${item._id.year}`;
      } else if (interval === "quarterly") {
        return `Q${item._id.quarter}/${item._id.year}`;
      } else if (interval === "yearly") {
        return `${item._id.year}`;
      }
    }),
    datasets: [
      {
        label: "Sales Growth Rate (%)",
        data: growthData.map((item) => item.growthRate),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="md:p-4 p-2">
      <a className="underline cursor-pointer" href="/">
        Go Back
      </a>
      <div className="my-3">
        <label className="md:text-xl text-sm" htmlFor="interval">
          Select Interval:{" "}
        </label>
        <select
          id="interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="border md:p-1"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default SalesGrowth;
