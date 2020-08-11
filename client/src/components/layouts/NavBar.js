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
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} className='img' width='200' alt='logo' />
        </Link>

        <div className='row'>
          <div className='col-sm'>
            <Link to='/' className='nav-link text-dark'>
              <strong>Home</strong>
            </Link>
          </div>
          <div className='col-sm'>
            <Link to='/' className='nav-link text-dark'>
              <strong>FAQS</strong>
            </Link>
          </div>
          {props.auth.isAuthenticated ? (
            <div className='col-sm'>
              <Link
                to='/register'
                className='nav-link text-dark'
                onClick={onLogoutClick}
              >
                <strong>Logout</strong>
              </Link>
            </div>
          ) : (
            <Fragment>
              <div className='col-sm'>
                <Link to='/login' className='nav-link text-dark'>
                  <strong>Login</strong>
                </Link>
              </div>
              <div className='col-sm'>
                <Link to='/register' className='nav-link text-dark'>
                  <strong>Register</strong>
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
