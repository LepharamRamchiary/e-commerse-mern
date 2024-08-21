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

const RepeatCustomers = () => {
  const [repeatCustomersData, setRepeatCustomersData] = useState([]);
  const [interval, setInterval] = useState("monthly");

  useEffect(() => {
    const fetchRepeatCustomersData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/customers/repeat-customers-over-time?interval=${interval}`
        );
        setRepeatCustomersData(response.data);
      } catch (error) {
        console.error("Error fetching repeat customers data", error);
      }
    };

    fetchRepeatCustomersData();
  }, [interval]);

  if (!repeatCustomersData || repeatCustomersData.length === 0) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: repeatCustomersData.map((item) => {
      if (interval === "daily") {
        return `${item._id.day}/${item._id.month}/${item._id.year}`;
      } else if (interval === "monthly") {
        return `${item._id.month}/${item._id.year}`;
      } else if (interval === "quarterly") {
        return `Q${item._id.quarter} ${item._id.year}`;
      } else if (interval === "yearly") {
        return `${item._id.year}`;
      }
    }),
    datasets: [
      {
        label: "Repeat Customers",
        data: repeatCustomersData.map((item) => item.repeatCustomersCount),
        backgroundColor: "rgba(255,159,64,0.4)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="md:p-4">
      <a className="underline cursor-pointer" href="/">
        Go Back
      </a>
      <div className="my-3">
        <label className=" md:text-xl" htmlFor="interval">
          Select Interval:{" "}
        </label>
        <select
          id="interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="border p-1"
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

export default RepeatCustomers;
