import React from 'react'

function Home() {
  return (
    <div className='w-full min-h-screen '>
        <div className='h-20 bg-gray-600 flex justify-center items-center p-4 md:p-0'>
            <h1 className='md:text-2xl text-lg font-serif font-semibold text-white'>View Visualization by Clicking Here</h1>
        </div>
        <div className='flex'>
            <div className='flex flex-col w-full md:items-center  bg-gray-400 min-h-screen gap-3 cursor-pointer p-6 text-white md:text-2xl'>
                <a href="/sales">Total Sales Over Time</a>
                <a href="/salesgrowth">Sales Growth Rate Over Time</a>
                <a href="/newcustomers">New Customers Added Over Time</a>
                <a href="/repeatcustomers">Number of Repeat Customers</a>
                <a href="/gd">Geographical Distribution of Customers</a>
                <a href="/clv">Customer Lifetime Value by Cohorts</a>
            </div>
        </div>
    </div>
  )
}

export default Home