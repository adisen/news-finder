import React from "react";
import { connect } from "react-redux";

import image from "../../assets/img/placeholder.jpg";

const Profile = ({ auth }) => {
  console.log(auth.user);
  return (
    <div className='px-4 mt-5'>
      <div className='card text-center m-auto mw-100 w-50'>
        <div className='card-body'>
          <h2>User Info </h2>
          <img src={image} className='img-thumbnail' alt='Profile' />
          <h5>{auth.user.name}</h5>
          <h6 className='text-muted mb-5'>Senior Developer</h6>
          <p className='text-muted'>
            This is a placeholder for your profile details, we are working on
            making sure that you can update this in the future
          </p>
          <div>
            <a href='!#'>
              <i className='fab fa-twitter d-inline-block red-icon mx-2'></i>
            </a>
            <a href='!#'>
              <i className='fab fa-facebook d-inline-block red-icon mx-2'></i>
            </a>
            <a href='!#'>
              <i className='fab fa-linkedin-in d-inline-block red-icon mx-2'></i>
            </a>
            <a href='!#'>
              <i className='fas fa-envelope d-inline-block red-icon mx-2'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Profile);
