import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function UserProfile() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header text-center bg-dark text-white py-3 fs-3 rounded-top">
          User Profile
        </div>
        <div className="card-body">
          <ul className="d-flex justify-content-around list-unstyled fs-4 mb-4">
            <li className="nav-item">
              <NavLink 
                to="articles" 
                className={({ isActive }) => 
                  `nav-link px-4 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`
                }
              >
                Articles
              </NavLink>
            </li>
          </ul>
          <div className="mt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
