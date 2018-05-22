import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    isAuthenticated: false,
    log: [],
    username: ""
  };

  handleLoginFailure = response => {
    this.setState({
      isAuthenticated: false,
      log: [...this.state.log, JSON.stringify(response)]
    });
  };

  handleLoginSuccess = response => {
    this.setState({
      isAuthenticated: true,
      log: [...this.state.log, JSON.stringify(response)],
      username: response.w3.U3
    });
  };

  handleLogout = () => {
    this.setState({
      isAuthenticated: false
    });
  };

  render = () => {
    const { isAuthenticated, log, username } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {isAuthenticated
            ? <button
                className="App-button"
                onClick={this.handleLogout}
                type="button"
              >
                {"Logout"}
              </button>
            : <GoogleLogin
                clientId="YOUR_OAUTH_ID_HERE_GO_TO_https://console.developers.google.com/apis/credentials_AND_MAKE_ONE"
                buttonText="Login"
                onSuccess={this.handleLoginSuccess}
                onFailure={this.handleLoginFailure}
              />}
        </div>
        <div>
          {isAuthenticated
            ? `Authenticated as: ${username}`
            : "Not authenticated"}
        </div>
        <textarea
          className="App-log"
          cols="80"
          readOnly
          rows="20"
          value={log.join("\n")}
        />
      </div>
    );
  };
}

export default App;
