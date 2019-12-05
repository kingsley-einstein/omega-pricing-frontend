import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Sidebar from './components/sidebar';
import Login from './components/login';
import Customer from './components/customer';
import Register from './components/register'
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false
    }
  }

  showSidebar = () => {
    this.setState({ showSidebar: true });
  }

  hideSidebar = () => {
    this.setState({ showSidebar: false });
  }

  logOut = () => {
    this.hideSidebar();
    localStorage.clear();
    window.location.href = "/login";
  }

  isLoggedIn = () => {
    return window.location.href.endsWith("/customer") || window.location.href.endsWith("/register");
  } 
  render() {
    return (
      <div>
        <Router>
          <Header handler={this.showSidebar} />
          <Sidebar open={this.state.showSidebar} closeHandler={this.hideSidebar} isLoggedIn={this.isLoggedIn()} logoutHandler={this.logOut} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/register" component={Register} />
        </Router>
      </div>
    );
  }
}

export default App;
