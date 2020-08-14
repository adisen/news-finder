import React from "react";

import placeholder from "../../assets/img/placeholder.jpg";
const Author = ({ author, author_name }) => {
  const {
    profile_pic,
    links,
    current_title,
    current_employer,
    current_work_email,
  } = author;

  return (
    <div className='card'>
      <div className='p-3'>
        <h2>
          <strong>About Author</strong>
        </h2>
      </div>
      <div className='row justify-content-center'>
        {profile_pic ? (
          <img
            src={profile_pic}
            className='card-img-top img-fluid img-thumbnail'
            alt='Profile pic'
          />
        ) : (
          <img
            src={placeholder}
            className='img-fluid img-thumbnail'
            alt='Profile pic'
          />
        )}
      </div>
      <div className='card-body text-center'>
        <h4 className='card-title text-dark'>
          <strong>{author_name}</strong>
        </h4>
        {current_title && <h5 className='text-muted'>{current_title}</h5>}
        {current_employer && <h6 className='text-muted'>{current_employer}</h6>}
        <div className='row mt-4 justify-content-around'>
          {links?.facebook && (
            <div className='col-3'>
              <a href={links.facebook} target='__blank'>
                <i className='fab fa-facebook-square red-icon'></i>
              </a>
            </div>
          )}

          {links?.linkedin && (
            <div className='col-3'>
              <a href={links.linkedin} target='__blank'>
                <i className='fab fa-linkedin red-icon'></i>
              </a>
            </div>
          )}

          {links?.twitter && (
            <div className='col-3'>
              <a href={links.twitter} target='__blank'>
                <i className='fab fa-twitter-square red-icon'></i>
              </a>
            </div>
          )}
          {current_work_email && (
            <div className='col-3'>
              <a href={`mailto:${current_work_email}`} target='__blank'>
                <i className='far fa-envelope red-icon'></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author;
