import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Spinner from "../layouts/Spinner";
import Author from "../author/Author";

moment().format();

class Article extends Component {
  componentDidMount() {
    const { link, author, company } = this.props.location.state;
    this.props.getArticle(link);
    this.props.getAuthor(author, company);
    // console.log(this.props.location.state.link);
  }

  render() {
    const {
      link,
      title,
      primary_author,
      date_published,
      primary_image_link,
      body,
    } = this.props.article;

    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <div style={{ background: "#FCFCFC" }}>
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
                {moment(date_published).format("DD-MM-YYYY")}
              </h5>
              <img
                src={primary_image_link}
                className='img-fluid mb-5'
                alt='Post'
              />
              <h3 className='font-weight-bold mb-4'>{title}</h3>
              <h5 className='font-weight-bold mb-4 text-muted'>
                Author: {primary_author}
              </h5>
              <p className='text-dark'>{body}</p>
            </div>
            <div className='col-lg'>
              <Author author={this.props.author} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Article;
