import React from "react";
import { Link } from "react-router-dom";

const NewsItem = ({ details }) => {
  return (
    <div className='col-lg-3 col-sm-12 mb-4'>
      <Link
        className='card-link'
        to={{
          pathname: `/article/${encodeURI(details.title)}`,
          state: {
            details: details,
          },
        }}
      >
        <div className='card mt-3 h-100'>
          <img
            src={details.urlToImage}
            className='card-img-top'
            alt='News'
          ></img>
          <div className='card-body mb-3 pb-0'>
            <h6 className='card-title text-dark'>
              <strong>{details.title.slice(0, 60)}...</strong>
            </h6>
            <h6 className='card-subtitle mb-2 text-danger'>
              <strong>{details.author}</strong>
            </h6>
            <p className='card-text text-muted'>{`${
              details.content
                ? details.content.slice(0, 60)
                : "No description found"
            }..`}</p>
            {/* <Link
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
            */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsItem;
