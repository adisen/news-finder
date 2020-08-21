import React, { Component } from "react";
import ReactPaginate from "react-paginate";

import News from "../news/News";
import Spinner from "../layouts/Spinner";

class Home extends Component {
  componentDidMount() {
    this.props.initialLoad();
  }

  state = {
    text: "",
    page: 1,
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.searchNews(this.state.text, this.state.page);
    // this.setState({ text: "" });
  };

  onButtonClick = e => {
    this.props.searchNews(e.target.value);
  };

  onPageChange = data => {
    let selected = data.selected;
    this.setState({ page: selected + 1 });
    // console.log(this.state.text)
    if (this.state.text === "") {
      this.props.initialLoad(this.state.page);
    } else {
      this.props.searchNews(this.state.text, this.state.page);
    }
  };

  render() {
    console.log(this.props.pagination);
    const { pageCount } = this.props.pagination;
    return (
      <div className='px-4'>
        <form onSubmit={this.onSubmit} className='mb-5 mt-5'>
          <div className='row justify-content-md-center'>
            <div className='col-8'>
              <input
                value={this.state.text}
                onChange={this.onChange}
                type='text'
                name='text'
                className='form-control mt-3 search-input'
                placeholder='Search Articles'
              />
            </div>
            <div className='col-2'>
              <button
                type='submit'
                className='btn mt-3 search-button text-light'
                style={{ backgroundColor: "#17264C" }}
              >
                <i className='fas fa-search'></i>
                {"  "}Search
              </button>
            </div>
          </div>
        </form>

        <div>
          <p className='d-inline-block mr-4'>
            {" "}
            <i className='fas fa-chart-line mr-2 '></i>{" "}
            <strong>Trending Outlets: </strong>
          </p>
          {/* {this.props.trendingTopics.map(topic => {
            return (
              <button
                key={topic.id}
                onClick={this.onButtonClick}
                value={topic.name}
                className='btn btn-danger px-4 py-1 mr-3 mb-3'
              >
                {topic.name}
              </button>
            );
          })} */}
        </div>

        {this.props.loading ? <Spinner /> : <News news={this.props.news} />}
        {this.props.news.length === 0 ? null : (
          <div className='mt-5 text-center'>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={this.onPageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"page-active"}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
