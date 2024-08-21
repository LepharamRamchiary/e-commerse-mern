import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const GeographicalDistribution = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          "https://e-commerse-mern-1.onrender.com/api/customers/geographical-distribution"
        );
        setCityData(response.data);
      } catch (error) {
        console.error("Error fetching city data", error);
      }
    };

    fetchCityData();
  }, []);

  if (!cityData || cityData.length === 0) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const chartData = {
    labels: cityData.map((item) => item._id),
    datasets: [
      {
        label: "Number of Customers",
        data: cityData.map((item) => item.count),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} customers`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  return (
    <div className="md:p-6 p-2">
      <a className="underline cursor-pointer" href="/">
        Go Back
      </a>
      <h2 className="md:text-xl text-sm">Geographical Distribution of Customers</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GeographicalDistribution;
