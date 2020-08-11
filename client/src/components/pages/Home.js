import React, { Component } from "react";

import News from "../news/News";
import Spinner from "../layouts/Spinner";

class Home extends Component {
  componentDidMount() {
    this.props.initialLoad();
  }

  state = {
    text: "",
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.searchNews(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div className='mt-5'>
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
      </div>
    );
  }
}

export default Home;
