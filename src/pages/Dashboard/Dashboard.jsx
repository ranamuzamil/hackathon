import React from 'react'
import Sidebar from '../../components/Header/Sidebar'
import Card from '../../components/Cards/Card';
const Dashboard = () => {

  


  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex flex-col mx-80 my-16 '>
          <h1>Dashboard</h1>
          <hr />
        <div className='flex my-2 md:gap-5'>
          <Card text="Current Courses" contented="0" classByProps="font-bold bg-gray-800" />
          <Card text="Total Studends" contented="0" classByProps="font-bold bg-gray-800" />
          <Card text="Today Attendance" contented="0" classByProps="font-bold bg-gray-800" />
        </div>  

        <br />
          <h1>Analysis</h1>
          <hr />


                 
      </div>
    </div>
  )
}

export default Dashboard
