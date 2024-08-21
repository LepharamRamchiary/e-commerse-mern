import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const NewCustomersOverTimeChart = () => {
    const [newCustomersData, setNewCustomersData] = useState([]);
    const [interval, setInterval] = useState('monthly'); 

    useEffect(() => {
        const fetchNewCustomersData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/new-customers-over-time?interval=${interval}`);
                setNewCustomersData(response.data);
            } catch (error) {
                console.error('Error fetching new customers data', error);
            }
        };

        fetchNewCustomersData();
    }, [interval]);

    if (!newCustomersData || newCustomersData.length === 0) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    const chartData = {
        labels: newCustomersData.map(item => {
            if (interval === 'daily') {
                return `${item._id.day}/${item._id.month}/${item._id.year}`;
            } else if (interval === 'monthly') {
                return `${item._id.month}/${item._id.year}`;
            } else if (interval === 'yearly') {
                return `${item._id.year}`;
            }
        }),
        datasets: [
            {
                label: 'New Customers',
                data: newCustomersData.map(item => item.newCustomersCount),
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    return (
        <div className="md:p-4">
      <a className="underline cursor-pointer" href="/">Go Back</a>
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
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Line data={chartData} />
    </div>
    );
};

export default NewCustomersOverTimeChart;
