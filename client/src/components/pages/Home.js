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
      <div>
        <h2 className='mt-5'>Welcome to the News Search App</h2>
        <form onSubmit={this.onSubmit}>
          <div className='input-group mb-3'>
            <input
              value={this.state.text}
              onChange={this.onChange}
              type='text'
              name='text'
              className='form-control mt-3'
              placeholder='Please enter your search query'
              aria-label='Sizing example input'
              aria-describedby='inputGroup-sizing-default'
            />
          </div>
          <button
            type='submit'
            className='btn btn-danger btn-lg btn-block mt-3'>
            Search
          </button>
        </form>

        {this.props.loading ? <Spinner /> : <News news={this.props.news} />}
      </div>
    );
  }
}

export default Home;
