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

  onButtonClick = e => {
    this.props.searchNews(e.target.value);
  };

  render() {
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

        {this.props.loading ? <Spinner /> : <News news={this.props.news} />}
      </div>
    );
  }
}

export default Home;
