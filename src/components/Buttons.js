import React, { Component } from 'react';
import Display from './Display.js';
import './../styles/Buttons.css';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      stored: 0,
      result: 0,
      operator: '',
      solved: false,
      displayValue: 0
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    var nums = ['.','0','1','2','3','4','5','6','7','8','9'];
    var operators = ['/','*','-','+']
    if (e.key === "Enter" || e.key === "=") {
      this.handleSolveClick();
    } else if (e.key === "c" || e.key === "C") {
        this.handleClearClick();
    } else if (nums.includes(e.key)) {
        this.handleNumberClick(e.key);
    } else if (operators.includes(e.key)) {
        this.handleOperatorClick(e.key);
    } else if (e.key === "%") {
        this.handlePercentClick();
    } else if (e.key === '!') {
        this.handlePosNegClick();
    } else if (e.key === "Backspace") {
        this.handleBackspaceClick();
    }
  }

  handleClearClick() {
    this.setState({
      solved: false,
      current: 0,
      stored: 0,
      result: 0,
      operator: '',
      displayValue: 0
    });
  }

  handleNumberClick(number) {
    if (this.state.solved === true) {
      this.handleClearClick();
    }
    const currentValue = this.state.current;
    let newValue = [];
    if (currentValue !== 0) {
      newValue.push(this.state.current);
    }
    newValue.push(number);
    newValue = newValue.join('');
    this.setState({
      solved: false,
      current: newValue,
      displayValue: newValue
    });
  }

  handleBackspaceClick() {
    let currentValue = this.state.current
    // if current is a negative number or a float, do nothing
    if (currentValue < 0 || currentValue % 1 !== 0) {
      return null;
    } else {
      if (currentValue !== 0) {
        // split current into array to change it
        let newValue = currentValue.split('');
        // if current is only 1 digit, set to 0 so that current does not get nullified.
        if (newValue.length === 1) {
          this.setState({
            solved: false,
            current: 0,
            displayValue: 0
          })
          // Pop last number off of current, join it, update state
        } else {
          newValue.pop();
          newValue = newValue.join('');
          this.setState({
            solved: false,
            current: newValue,
            displayValue: newValue
          });
        }
      };
    }
  }

  handleOperatorClick(operator) {
    this.setState({
      operator: operator,
      solved: false,
      displayValue: this.state.current,
      stored: this.state.current,
      current: 0
    });
  }

  handlePercentClick() {
    let number = this.state.current;
    let percentage = number * 0.01;

    this.setState({
      result: percentage,
      current: percentage,
      stored: 0,
      solved: true,
      displayValue: percentage
    })
  }

  handlePosNegClick() {
    let number = this.state.current;

    var res;

    if (number > 0) {
      let double = number * 2;
      res = number - double;
    } else if (number < 0) {
      let double = number * -2;
      res = number + double;
    } else {
      res = 0;
    }

    this.setState({
      result: res,
      current: res,
      stored: 0,
      solved: true,
      displayValue: res
    });
  }

  handleSolveClick() {
    if (this.state.current && this.state.stored && this.state.operator) {

      this.setState({
        stored: parseInt(this.state.stored, 10),
        current: parseInt(this.state.current, 10)
      });

      if ( !this.state.solved ) {
        var result;

        if (this.state.operator === '+') {
          result = this.state.stored + this.state.current;
        } else if (this.state.operator === '-') {
            result = this.state.stored - this.state.current;
        } else if (this.state.operator ==='*') {
            result = this.state.stored * this.state.current;
        } else if (this.state.operator === '/') {
            result = this.state.stored / this.state.current;
        }

        this.setState({
          result: result,
          solved: true,
          current: result,
          stored: 0,
          operator: '',
          displayValue: result
        });
      }
    }
  }

  render() {
    return (
      <div className="Buttons">

        <ul className="buttons-list">

          <li
            className="top-row button"
            onClick={ () => this.handleClearClick() }>
            <h2>{ this.state.current === 0 && this.state.stored === 0 && !this.state.solved ? 'AC' : 'C' }</h2>
          </li>

          <li
            className="top-row button"
            onClick={ () => this.handlePosNegClick() }>
            <h2> +/- </h2>
          </li>

          <li
            className="top-row button"
            onClick={ () => this.handlePercentClick() }>
            <h2> % </h2>
          </li>

          <li
            className={this.state.operator === '/' ? 'active-operator button' : 'operator button' }
            onClick={ () => this.handleOperatorClick('/') }>
            <h2> ÷ </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(7) }>
            <h2> 7 </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(8) }>
            <h2> 8 </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(9) }>
            <h2> 9 </h2>
          </li>

          <li
            className={this.state.operator === '*' ? 'active-operator button' : 'operator button' }
            onClick={ () => this.handleOperatorClick('*') }>
            <h2> x </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(4) }>
            <h2> 4 </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(5) }>
            <h2> 5 </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(6) }>
            <h2> 6 </h2>
          </li>

          <li
            className={this.state.operator === '-' ? 'active-operator button' : 'operator button' }
            onClick={ () => this.handleOperatorClick('-') }>
            <h2> - </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(1) }>
            <h2> 1 </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(2) }>
            <h2> 2 </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick(3) }>
            <h2> 3 </h2>
          </li>

          <li
            className={this.state.operator === '+' ? 'active-operator button' : 'operator button' }
            onClick={ () => this.handleOperatorClick('+') }>
            <h2> + </h2>
          </li>

          <li
            className="zero button"
            onClick={ () => this.handleNumberClick(0) }>
            <h2> 0 </h2>
          </li>

          <li
            className="button"
            onClick={ () => this.handleNumberClick('.') }>
            <h2> . </h2>
          </li>

          <li
            className="operator button"
            onClick={ () => this.handleSolveClick() }>
            <h2> = </h2>
          </li>

        </ul>
        < Display
            displayValue={this.state.displayValue}
            solved={this.state.solved}
            result={this.state.result}
        />
      </div>
    )
  }
}

export default Buttons;
