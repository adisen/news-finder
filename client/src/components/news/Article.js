import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Spinner from "../layouts/Spinner";

moment().format();

class Article extends Component {
  componentDidMount() {
    this.props.getArticle(this.props.location.state.link);
    // console.log(this.props.location.state.link);
  }

  render() {
    const {
      link,
      title,
      primary_author,
      date_published,
      snippet,
      primary_image_link,
    } = this.props.article;

    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <Fragment>
        <Link to='/' className='btn btn-secondary mt-4'>
          Go back Home
        </Link>
        {this.props.loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='card mt-5'>
            <div className='card-body'>
              <img
                src={primary_image_link}
                className='img-thumbnail card-img-top'
                alt='Post'
                style={{ width: "50%", height: "50%" }}
              />
              <h3 className='font-weight-bold'>{title}</h3>
              <h5 className='font-weight-bold'>{primary_author}</h5>
              {/* <p>{moment().toNow}</p> */}
              <p>{snippet}</p>
              <a href={link} target='__blank'>
                Read more
              </a>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Article;
