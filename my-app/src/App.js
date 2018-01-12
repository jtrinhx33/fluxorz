import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Viewport from './components/Viewport';
import helpers from './helpers.js';
//import config from './config.js'

class App extends Component {

  init() {
    // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
    // check that the user is logged in, otherwise show the login page
    .then(function() { return helpers.isLoggedIn() })
    .then(function(isLoggedIn) {
      if (isLoggedIn) {
        alert('Is logged in');
        // if logged in, make sure the login page is hidden
        //hideLogin()
        // create the viewport
        //initViewport()

        //manually set the viewport's geometry to box_data
        //viewport.setGeometryEntity(box_data)

        // prepare the cell (key) select boxes
        //initCells()
        // prepare the create key input + button
        //initCreate()
        // get the user's projects from Flux
        //fetchProjects()
      } else {
        //showLogin();
      }
    })
  }

  handleLogin() {
    helpers.redirectToFluxLogin()

    // Check if we're coming back from Flux with the login credentials.
    //helpers.storeFluxUser();

    //this.initViewport();
  }

  /**
  * Initialize the 3D viewport.
  */
  initViewport() {
    // attach the viewport to the #div view
    var viewport = new window.FluxViewport(document.querySelector("#view"));
    // set up default lighting for the viewport
    viewport.setupDefaultLighting();
    // set the viewport background to white
    viewport.setClearColor(0xffffff);
  }

  render() {
    this.init();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Login
          showLogin={true}
          onClick={() => this.handleLogin()}
        />

        <Viewport />

      </div>
    );
  }
}

export default App;
