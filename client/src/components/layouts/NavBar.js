import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import logo from "../../assets/img/logo.png";

const NavBar = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <nav className='navbar navbar-dark bg-danger'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} className='img' style={{ width: "40%" }} alt='logo' />
        </Link>
        <div className='row'>
          <div className='col-sm'>
            <Link to='/' className='nav-link text-white'>
              Home
            </Link>
          </div>
          {props.auth.isAuthenticated ? (
            <div className='col-sm'>
              <Link
                to='/register'
                className='nav-link text-white'
                onClick={onLogoutClick}>
                Logout
              </Link>
            </div>
          ) : (
            <Fragment>
              <div className='col-sm'>
                <Link to='/login' className='nav-link text-white'>
                  Login
                </Link>
              </div>
              <div className='col-sm'>
                <Link to='/register' className='nav-link text-white'>
                  Register
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
