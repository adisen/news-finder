import React, { Component } from "react";
import ReactPaginate from "react-paginate";

import News from "../news/News";
import Spinner from "../layouts/Spinner";

class Home extends Component {
  state = {
    text: "",
  };

  page = 1;
  source = "";

  outlets = [];

  componentDidMount() {
    this.props.initialLoad(this.state.page);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onButtonClick = e => {
    // this.setState({ source: e.target.value });
    this.source = e.target.value;
    console.log(this.source);
    this.props.searchBySource(this.source, this.page);
  };

  onPageChange = data => {
    let selected = data.selected;
    this.page = selected + 1;
    console.log(this.page);

    if (this.state.text === "" && this.state.source === "") {
      this.props.initialLoad(this.page);
    } else if (!(this.source === "")) {
      this.props.searchBySource(this.source, this.page);
    } else {
      this.props.searchNews(this.state.text, this.page);
    }
  };

  render() {
    // eslint-disable-next-line
    this.props.news.map(article => {
      const exists = this.outlets.some(el => el.name === article.source.name);
      if (article.source.id === null) {
        // eslint-disable-next-line
        return;
      }
      if (!exists) {
        this.outlets.push(article.source);
      }
    });
    const { pageCount } = this.props.pagination;

    return (
      <div className='px-5' style={{ minHeight: "80vh" }}>
        {/* <form onSubmit={this.onSubmit} className='mb-5 mt-5'>
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
        </form> */}

        <div className='mt-5'>
          <p className='d-inline-block mr-4'>
            {" "}
            <i className='fas fa-chart-line mr-2 '></i>{" "}
            <strong>Trending Outlets: </strong>
          </p>
          {this.outlets.map(source => {
            return (
              <button
                key={source.id}
                onClick={this.onButtonClick}
                value={source.id}
                className='btn btn-danger px-4 py-1 mr-3 mb-3'
              >
                {source.name}
              </button>
            );
          })}
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
