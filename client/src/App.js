import React, { Fragment, Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

import NavBar from "./components/layouts/NavBar";
import Home from "./components/pages/Home";
import Article from "./components/news/Article";

dotenv.config();

class App extends Component {
  state = {
    articles: [],
    article: {},
    loading: false,
  };

  // Get trending articles
  initialLoad = async () => {
    const params = {
      api_key: "EF1CB5AF26694720A7781C96FD7D2A18",
      locale: "en-US",
    };

    this.setState({ loading: true });

    try {
      const res = await axios.get("https://api.breakingapi.com/trending", {
        params,
      });
      this.setState({ articles: res.data.articles, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  // Search articles
  searchNews = async text => {
    const params = {
      api_key: "EF1CB5AF26694720A7781C96FD7D2A18",
      type: "headlines",
      locale: "en-US",
      q: { text },
    };

    this.setState({ loading: true });

    try {
      const res = await axios.get("https://api.breakingapi.com/news", {
        params,
      });
      this.setState({ articles: res.data.articles, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  // Get single article
  getArticle = async link => {
    // TODO: Get a single article are display
    const params = {
      api_key: "EF1CB5AF26694720A7781C96FD7D2A18",
      link: `${link}`,
    };
    this.setState({ loading: true });

    try {
      const res = await axios.get("https://api.breakingapi.com/articles", {
        params,
      });
      console.log(res.data);
      this.setState({ article: res.data.article, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Home
                    searchNews={this.searchNews}
                    news={this.state.articles}
                    loading={this.state.loading}
                    initialLoad={this.initialLoad}
                  />
                )}
              />
              <Route
                path='/article/:link'
                render={props => (
                  <Article
                    {...props}
                    getArticle={this.getArticle}
                    article={this.state.article}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
