import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { logoutUser } from "../../../../actions/authActions";
import { logoutUser } from "../../../actions/authActions";

import logo from "../../../assets/img/logo.png";

const NavBar = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <nav className='navbar sticky-top flex-md-nowrap shadow bg-light pl-0'>
      <Link
        className='navbar-brand col-md-3 col-lg-2 mr-0 px-3 d-md-none'
        to='/'
      >
        <img src={logo} className='img ml-3' width='150' alt='logo' />
      </Link>
      <button
        className='navbar-toggler position-absolute d-md-none collapsed'
        type='button'
        data-toggle='collapse'
        data-target='#sidebarMenu'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <i className='fas fa-bars navbar-toggler-icon'></i>
      </button>

      <ul className='navbar-nav px-4 ml-md-auto'>
        {/* <li className='nav-item active d-inline-block'>
          <Link to='/' className='nav-link text-dark'>
            <strong>Home</strong>
            <span className='sr-only'>(current)</span>
          </Link>
        </li>
        <li className='nav-item d-inline-block'>
          <Link to='/' className='nav-link text-dark'>
            <strong>FAQS</strong>
          </Link>
        </li> */}

        {props.auth.isAuthenticated ? (
          <li className='nav-item dropdown'>
            <Link
              className='nav-link dropdown-toggle text-dark'
              to='#'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <strong>{props.auth.user.name}</strong>
            </Link>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <Link
                to='/register'
                className='dropdown-item text-dark'
                onClick={onLogoutClick}
                role='button'
              >
                <strong>Logout</strong>
              </Link>
            </div>
          </li>
        ) : (
          <Fragment>
            <li className='nav-item ml-3'>
              <Link
                to='/login'
                className='nav-link text-light btn btn-dark btn-round'
              >
                <strong>Login</strong>
              </Link>
            </li>
            <li className='nav-item ml-3'>
              <Link
                to='/register'
                className='nav-link text-light btn btn-dark btn-round pl-4 pr-4'
              >
                <strong>Join Newz Jacking</strong>
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
