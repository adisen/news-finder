import React from "react";

import NewsItem from "./NewsItem";

const News = ({ news }) => {
  return (
    <div>
      <div className='mt-3 row justify-content-between'>
        {news.length > 0
          ? news.map(details => (
              <NewsItem key={details.title} details={details} />
            ))
          : null}
      </div>
    </div>
  );
};

export default News;
