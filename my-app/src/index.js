import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import box_data from './box.js'

var viewport;

/**
 * Initialize the 3D viewport.
 */
function initViewport() {
  // attach the viewport to the #div view
  viewport = new window.FluxViewport(document.querySelector("#view"))
  // set up default lighting for the viewport
  viewport.setupDefaultLighting();
  // set the viewport background to white
  viewport.setClearColor(0xffffff);

  viewport.setGeometryEntity(box_data)
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
