import React, { Component } from 'react';
import './../styles/Display.css';

class Display extends Component { 
  render() {
    return(
      <div className="Display">
        <h1 className="result"> {this.props.displayValue} </h1>
      </div>
    )
  }
}

export default Display;
