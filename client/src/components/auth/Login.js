import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
    // console.log(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='mt-5'>
        <h1 className='mb-3'>
          Login <span>Below</span>
        </h1>
        <p className='text-muted'>
          Don't have an acount? <Link to='/register'>Register</Link>
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              onChange={this.onChange}
              value={this.state.email}
              id='email'
              aria-describedby='emailHelp'
              className={classnames("form-control", {
                invalid: errors.email || errors.emailnotfound,
              })}
            />
            <span className='text-danger'>
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              onChange={this.onChange}
              value={this.state.password}
              id='password'
              className={classnames("form-control", {
                invalid: errors.password || errors.passwordincorrect,
              })}
            />
            <span className='text-danger'>
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>
          <button
            type='submit'
            className='btn btn-danger mt-2 pl-5 pr-5 pt-2 pb-2'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
