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
      <div className='px-4'>
        <h2 className='mt-5 text-dark text-center'>
          <strong>Trending Articles</strong>
        </h2>
        <p></p>

        {this.props.loading ? <Spinner /> : <News news={this.props.news} />}
      </div>
    );
  }
}

export default Home;
