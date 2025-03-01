import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AuthorProfile() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ul className="flex justify-center space-x-10 text-xl font-medium text-gray-700">
        <li>
          <NavLink 
            to="articles" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive ? 'text-black bg-gray-200 shadow-md' : 'hover:text-black hover:bg-gray-100'
              }`
            }
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="article" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive ? 'text-black bg-gray-200 shadow-md' : 'hover:text-black hover:bg-gray-100'
              }`
            }
          >
            Add new Article
          </NavLink>
        </li>
      </ul>
      <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;
