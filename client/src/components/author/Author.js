import React from "react";

import placeholder from "../../assets/img/placeholder.jpg";
const Author = ({ author }) => {
  const {
    name,
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
            alt='...'
          />
        ) : (
          <img
            src={placeholder}
            className='img-fluid img-thumbnail'
            width='100'
          />
        )}
      </div>
      <div className='card-body text-center'>
        <h3 className='card-title text-dark'>
          <strong>{name}</strong>
        </h3>
        {current_title && (
          <h5 className='card-text text-muted'>{current_title}</h5>
        )}
        <div className='row mt-4 justify-content-around'>
          {links?.facebook && (
            <div className='col'>
              <a href={links.facebook} target='__blank'>
                <i className='fab fa-facebook-square red-icon'></i>
              </a>
            </div>
          )}

          {links?.linkedin && (
            <div className='col'>
              <a href={links.linkedin} target='__blank'>
                <i className='fab fa-linkedin red-icon'></i>
              </a>
            </div>
          )}

          {links?.twitter && (
            <div className='col'>
              <a href={links.twitter} target='__blank'>
                <i className='fab fa-twitter-square red-icon'></i>
              </a>
            </div>
          )}
          {current_work_email && (
            <div className='col'>
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
