import React from 'react'
import { Routes, Route  } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Attendance from './pages/Attendance/Attendance'
import Courses from './pages/Courses/Courses'
import Students from './pages/Students/Students'
import Errorr from './pages/Error/Errorr'

const Routing = () => {
  return (
    <>
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard/>} />
        <Route path='/attendance' element={<Attendance/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/students' element={<Students/>} />
        <Route path="*" element={<Errorr/>} />
      </Route>
    </Routes>     
    </>
  )
}

export default Routing
