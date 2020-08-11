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

import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";
import Home from "./components/pages/Home";
import Article from "./components/news/Article";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./utils/PrivateRoute";

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
    author: {},
  };

  // Get trending articles
  initialLoad = async () => {
    this.setState({ loading: true });

    try {
      const res = await axios.get("/api/news/trending");
      this.setState({ articles: res.data.articles, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  // Search articles
  searchNews = async text => {
    const params = {
      text,
    };

    this.setState({ loading: true });

    try {
      const res = await axios.get(`/api/news/search`, { params });
      this.setState({ articles: res.data.articles, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  // Get single article
  getArticle = async link => {
    // TODO: Get a single article are display
    const params = {
      link: `${link}`,
    };

    this.setState({ loading: true });

    try {
      const res = await axios.get("/api/news/article", {
        params,
      });
      console.log(res.data);
      this.setState({ article: res.data.article, loading: false });
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
      console.log(res.data.author);
      this.setState({ author: res.data.author, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <NavBar />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute
                  exact
                  path='/'
                  searchNews={this.searchNews}
                  news={this.state.articles}
                  loading={this.state.loading}
                  initialLoad={this.initialLoad}
                  component={Home}
                />
                <PrivateRoute
                  path='/article/:link'
                  getArticle={this.getArticle}
                  getAuthor={this.getAuthor}
                  article={this.state.article}
                  author={this.state.author}
                  loading={this.state.loading}
                  component={Article}
                />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
