import React, { Fragment, Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Home from "./components/pages/Home";
import Article from "./components/news/Article";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";

dotenv.config();

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  state = {
    articles: [],
    article: {},
    loading: false,
    authorDetails: {},
    trendingOutlets: [],
    pagination: {
      perPage: 20,
    },
  };

  // Get trending articles
  initialLoad = async page => {
    const params = {
      page,
    };

    this.setState({ loading: true });

    try {
      const res = await axios.get("/api/news/trending", { params });
      console.log(res.data.articles);
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageCount: Math.ceil(
            res.data.articles.totalResults / this.state.pagination.perPage
          ),
        },
        articles: res.data.articles.articles,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Search articles
  searchNews = async (text, page) => {
    const params = {
      text,
      page,
    };

    this.setState({ loading: true });

    try {
      const res = await axios.get(`/api/news/search`, { params });
      console.log(res.data);

      this.setState({
        pagination: {
          ...this.state.pagination,
          pageCount: Math.ceil(
            res.data.articles.totalResults / this.state.pagination.perPage
          ),
        },
        articles: res.data.articles.articles,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Search author's profile
  getAuthor = async (name, company) => {
    const params = {
      name,
      company,
    };

    this.setState({ loading: true });

    try {
      const res = await axios.get("/api/author/", {
        params,
      });
      this.setState({ authorDetails: res.data.author, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error(error);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className=''>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute
                  exact
                  path='/'
                  searchNews={this.searchNews}
                  news={this.state.articles}
                  loading={this.state.loading}
                  pagination={this.state.pagination}
                  initialLoad={this.initialLoad}
                  trendingTopics={this.state.trendingTopics}
                  component={Home}
                />
                <PrivateRoute
                  exact
                  path='/search'
                  searchNews={this.searchNews}
                  news={this.state.articles}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  initialLoad={this.initialLoad}
                  component={Search}
                />
                <PrivateRoute
                  path='/article/:link'
                  getArticle={this.getArticle}
                  getAuthor={this.getAuthor}
                  article={this.state.article}
                  authorDetails={this.state.authorDetails}
                  loading={this.state.loading}
                  component={Article}
                />
                <PrivateRoute exact path='/profile' component={Profile} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
