import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo2.png";

const SideBar = () => {
  return (
    <nav
      className='col-md-3 col-lg-2 d-md-block sidebar collapse text-light'
      id='sidebarMenu'
    >
      <Link className='navbar-brand' to='/'>
        <img src={logo} className='img ml-3' width='150' alt='logo' />
      </Link>
      <div className='sidebar-sticky mt-5'>
        <ul className='nav flex-column'>
          <li className='nav-item mb-3'>
            <Link className='nav-link active text-light' to='/'>
              <i className='fas fa-chart-line mr-2 '></i>
              <strong>
                Trending Articles <span className='sr-only'>(current)</span>
              </strong>
            </Link>
          </li>
          <li className='nav-item mb-3'>
            <Link className='nav-link text-light' to='/search'>
              <i className='fas fa-search mr-2'></i>
              <strong>Search Articles</strong>
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link text-light' to='/profile'>
              <i className='fas fa-user mr-2'></i>
              <strong>Profile</strong>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
