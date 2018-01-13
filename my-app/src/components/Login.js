import React, { Component } from 'react';
//import helpers from './../helpers.js'
//import './../App.css';
//import config from './config.js'

class Login extends Component {

  render() {
    return (
      <div className='Login'>
        <div className='Login-button' onClick={this.props.onClick}>Login</div>
      </div>
    );
  }
}

export default Login;
