import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [interval, setInterval] = useState("monthly");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          `https://e-commerse-mern-1.onrender.com/api/sales/sales-over-time?interval=${interval}`
        );
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data", error);
      }
    };

    fetchSalesData();
  }, [interval]); 

  if (!salesData || salesData.length === 0) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const chartData = {
    labels: salesData.map((item) => {
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
        label: "Total Sales",
        data: salesData.map((item) => item.totalSales),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="md:p-4 p-2">
      <a className="underline cursor-pointer" href="/">Go Back</a>
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

export default Sales
