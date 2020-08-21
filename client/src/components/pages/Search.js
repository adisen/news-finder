import React, { Component } from "react";
import ReactPaginate from "react-paginate";

import News from "../news/News";
import Spinner from "../layouts/Spinner";

class Search extends Component {
  state = {
    text: "",
    page: 1,
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.searchNews(this.state.text);
    // this.setState({ text: "" });
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
    const { pageCount } = this.props.pagination;
    return (
      <div className='mt-5 px-4'>
        <h2 className='mt-5 text-dark text-center'>
          <strong>Search your favorite Article</strong>
        </h2>
        <form onSubmit={this.onSubmit} className='mb-5'>
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
                className='btn btn-danger mt-3 search-button'
              >
                <i className='fas fa-search'></i>
                {"  "}Search
              </button>
            </div>
          </div>
        </form>

        {this.props.loading ? <Spinner /> : <News news={this.props.news} />}
        {this.props.news.length === 0 ? null : (
          <div className='mt-5 mb-3 text-center'>
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

export default Search;
