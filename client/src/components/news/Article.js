import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Spinner from "../layouts/Spinner";
import Author from "../author/Author";

moment().format();

class Article extends Component {
  componentDidMount() {
    const { details } = this.props.location.state;
    this.props.getAuthor(details.author, details.source.name);
  }

  render() {
    const {
      details: { author, title, content, publishedAt, url, urlToImage },
    } = this.props.location.state;

    const { authorDetails } = this.props;

    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <div style={{ background: "#FCFCFC" }} className='px-4 mb-5'>
        <Link to='/' className='btn btn-secondary mt-4'>
          <i className='fas fa-arrow-left'></i>
          {"  "}
          Go back Home
        </Link>
        {this.props.loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='row mt-5'>
            <div className='col-lg-8 col-sm-12'>
              <h5 className='mb-5 text-dark'>
                <i className='far fa-calendar-alt red-icon mr-2'></i>
                {"  "}
                <strong>Date Published:</strong>{" "}
                {moment(publishedAt).format("DD-MM-YYYY")}
              </h5>
              <img src={urlToImage} className='img-fluid mb-5' alt='Post' />
              <h3 className='font-weight-bold mb-4'>{title}</h3>

              <p className='text-dark'>{content}</p>

              <a className='btn btn-primary' href={url} target='__blank'>
                Read Original Post
              </a>
            </div>
            <div className='col-lg'>
              {/* Do not render except there is author's details */}
              {Object.keys(authorDetails).length === 0 &&
              authorDetails.constructor === Object ? null : (
                <Author author={authorDetails} author_name={author} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Article;
