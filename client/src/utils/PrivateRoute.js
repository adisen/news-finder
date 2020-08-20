import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideBar from "../components/layouts/dashboard/SideBar";
import NavBar from "../components/layouts/dashboard/NavBar";
import Footer from "../components/layouts/Footer";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <div className='row'>
    <SideBar />
    <main className=' col-md-9 ml-sm-auto col-lg-10 p-0'>
      <NavBar />
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated === true ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to='/login' />
          )
        }
      />
      <Footer />
    </main>
  </div>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
