import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import helpers from './helpers.js';
import box_data from './box.js'

function Logout(props) {
  return (
    <button className="Logout" onClick={props.onClick}>
      Logout
    </button>
  );
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };

    this.initViewport = this.initViewport.bind(this);

    this.init();
  }

  init() {
    var self = this;
    // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
    .then(function() {
      return helpers.isLoggedIn()
    })
    // check that the user is logged in, otherwise show the login page
    .then(function(isLoggedIn) {
      if (isLoggedIn) {

        //const loggedIn = helpers.isLoggedIn();
        self.setState({
          isLoggedIn: true,
        });
        // create the viewport
        self.initViewport();

        //manually set the viewport's geometry to box_data
        //viewport.setGeometryEntity(box_data)

        // prepare the cell (key) select boxes
        //initCells()
        // prepare the create key input + button
        //initCreate()
        // get the user's projects from Flux
        //fetchProjects()
      } else {
        self.setState({
          isLoggedIn: true,
        });
      }
    });
  }

  handleLogin() {
    var self = this;
    helpers.redirectToFluxLogin()
    .then(function() {
      const loggedIn = helpers.isLoggedIn();
      self.setState({
        isLoggedIn: loggedIn,
      });
    });
  }

  handleLogout() {
    helpers.logout();
    this.setState({
      isLoggedIn: false,
    });
  }

  /**
  * Initialize the 3D viewport.
  */
  initViewport() {
    // attach the viewport to the #div view
    var viewport = new window.FluxViewport(document.querySelector("#view"));
    //var viewport = new window.FluxViewport(this.view);
    // set up default lighting for the viewport
    viewport.setupDefaultLighting();
    // set the viewport background to white
    viewport.setClearColor(0xffffff);

    viewport.setGeometryEntity(box_data);

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Fluxorz!</h1>
        </header>

        {this.state.isLoggedIn ?
          <div>
            <p className="App-intro">
              You are logged in!
            </p>
            <Logout
              onClick={() => this.handleLogout()}
            />
            <div id="view"></div>
          </div>
          :
          <Login
            onClick={() => this.handleLogin()}
          />
        }

      </div>
    );
  }
}

export default App;
