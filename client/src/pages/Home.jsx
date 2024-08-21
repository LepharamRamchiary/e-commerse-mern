import React from 'react'

function Home() {
  return (
    <div className='w-full min-h-screen '>
        <div className='h-20 bg-gray-600 flex justify-center items-center p-4 md:p-0'>
            <h1 className='md:text-2xl text-lg font-serif font-semibold text-white'>Clicks title and see the chats visulization</h1>
        </div>
        <div className='flex'>
            <div className='flex flex-col w-full md:items-center  bg-gray-400 min-h-screen gap-3 cursor-pointer p-6 text-white md:text-2xl'>
                <a href="/sales">Total Sales Over Time</a>
                <a href="/salesgrowth">Sales Growth Rate Over Time</a>
                <a href="#">New Customers Added Over Time</a>
                <a href="#">Number of Repeat Customers</a>
                <a href="#">Geographical Distribution of Customers</a>
                <a href="#">Geographical Distribution of Customers</a>
            </div>
        </div>
    </div>
  )
}

export default Home