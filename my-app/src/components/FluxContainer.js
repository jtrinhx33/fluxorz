import React, { Component } from 'react';
import box_data from '../box.js';

class FluxContainer extends Component {

  constructor(props) {
    super(props);

    this.box_data = [
      {
        "dimensions": [
          2,
          2,
          2
        ],
        "origin": [
          0,
          0,
          0
        ],
        "primitive": "block",
        "units": {
          "dimensions": "meters",
          "origin": "meters"
        }
      }
    ];

    this.initViewport();
  }

  /**
  * Initialize the 3D viewport.
  */
  initViewport() {
    // attach the viewport to the #div view
    this.viewport = new window.FluxViewport(document.querySelector("#view"));
    //var viewport = new window.FluxViewport(this.view);
    // set up default lighting for the viewport
    this.viewport.setupDefaultLighting();
    // set the viewport background to white
    //this.viewport.setClearColor(0xffffff);

    this.viewport.setGeometryEntity(this.box_data);
  }

  render() {
    return (
      <div id="view"></div>
    );
  }
}

export default FluxContainer;
