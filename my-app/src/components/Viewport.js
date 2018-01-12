import React, { Component } from 'react';

class Viewport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    return (
      <div className='geometry'>
        <div className='view'></div>
      </div>
    );
  }
}

export default Viewport;
