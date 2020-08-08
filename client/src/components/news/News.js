import React from "react";

import NewsItem from "./NewsItem";

const News = ({ news }) => {
  return (
    <div className='mt-3'>
      {news.length > 0
        ? news.map(details => (
            <NewsItem key={details.title} details={details} />
          ))
        : null}
    </div>
  );
};

export default News;
