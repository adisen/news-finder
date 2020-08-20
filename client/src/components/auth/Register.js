import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      loading: false,
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className=''>
        <NavBar />
        <div className='my-5 p-5 container card center-card mx-auto position-relative'>
          <h1 className='mb-3'>
            Register <span>Below</span>
          </h1>
          <p className='text-muted'>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                onChange={this.onChange}
                value={this.state.name}
                type='text'
                className='form-control'
                id='name'
                aria-describedby='emailHelp'
              />
              <span className='text-danger'>{errors.name}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email address</label>
              <input
                type='email'
                onChange={this.onChange}
                value={this.state.email}
                id='email'
                aria-describedby='emailHelp'
                className={classnames("form-control", {
                  invalid: errors.name,
                })}
              />
              <span className='text-danger'>{errors.email}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                onChange={this.onChange}
                value={this.state.password}
                id='password'
                className={classnames("form-control", {
                  invalid: errors.password,
                })}
              />
              <span className='text-danger'>{errors.password}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='password2'>Type Password Again</label>
              <input
                type='password'
                onChange={this.onChange}
                value={this.state.password2}
                id='password2'
                className={classnames("form-control", {
                  invalid: errors.password2,
                })}
              />
              <span className='text-danger'>{errors.password2}</span>
            </div>
            <button
              type='submit'
              className='btn btn-danger btn-block mt-2 pl-5 pr-5 pt-2 pb-2'
            >
              {this.state.loading ? (
                <div className='spinner-border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
