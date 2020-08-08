import React from "react";
import { Link } from "react-router-dom";

const NewsItem = ({ details }) => {
  return (
    <div className='card mt-3 '>
      <div className='card-body mb-3'>
        <h5 className='card-title'>{details.title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>
          {details.primary_author}
        </h6>
        <p className='card-text'>{`${details.snippet}...`}</p>
        <Link
          className='card-link'
          to={{
            pathname: `/article/${details.title}`,
            state: { link: details.link },
          }}>
          Read more
        </Link>
        <a href={details.link} target='__blank' className='card-link'>
          Read Original Post
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
