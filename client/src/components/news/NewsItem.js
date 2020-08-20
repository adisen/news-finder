import React from "react";
import { Link } from "react-router-dom";

const NewsItem = ({ details }) => {
  return (
    <div className='col-lg-3 col-sm-12 mb-4'>
      <div className='card mt-3' style={{ height: "90%" }}>
        <img src={details.urlToImage} className='card-img-top' alt='News'></img>
        <div className='card-body mb-3'>
          <h6 className='card-title text-dark'>
            <strong>{details.title}</strong>
          </h6>
          <h6 className='card-subtitle mb-2 text-danger'>
            <strong>{details.author}</strong>
          </h6>
          <p className='card-text text-muted'>{`${details.content}..`}</p>
          <Link
            className='card-link'
            to={{
              pathname: `/article/${encodeURI(details.title)}`,
              state: {
                details: details,
              },
            }}
          >
            <strong>Read more </strong>
          </Link>
          {/* <a href={details.link} target='__blank' className='card-link'>
          Read Original Post
        </a> */}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
