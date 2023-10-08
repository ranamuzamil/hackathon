import React from 'react';
import './Sidebar.css'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { Link, useLocation } from 'react-router-dom';
  


const Sidebar = () => {
  const location = useLocation();
    return (
      <div className='fixed' style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#300">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              Student Management
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <Link to="/" className={location.pathname === "/" ? "activeClicked" : ""}>
                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              </Link>
              <hr />
              <Link to="/courses" className={location.pathname === "/courses" ? "activeClicked" : ""}>
                <CDBSidebarMenuItem icon="table">Courses</CDBSidebarMenuItem>
              </Link>
              <Link to="/students" className={location.pathname === "/students" ? "activeClicked" : ""}>
                <CDBSidebarMenuItem icon="user">Students</CDBSidebarMenuItem>
              </Link>
              <Link to="/attendance" className={location.pathname === "/attendance" ? "activeClicked" : ""}>
                <CDBSidebarMenuItem icon="chart-line">Attendance</CDBSidebarMenuItem>
              </Link>
  
              {/* <NavLink exact to="" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
              </NavLink> */}
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };

export default Sidebar;