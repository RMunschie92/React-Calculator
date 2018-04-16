import React, { Component } from 'react';
import Buttons from './components/Buttons.js';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="container" >
        <h1 className="title">My React Calculator</h1>
        <div className="Calculator">
          <Buttons />
        </div>
      </div>
    );
  }
}

export default App;
