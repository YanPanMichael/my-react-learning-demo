import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // This binding is necessary to make `this` work in the callback
      this.handleClick = 
        this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    // handleClick = () => {
    //   this.setState(prevState => ({
    //     isToggleOn: !prevState.isToggleOn
    //   }));
    // }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
        // // This syntax ensures `this` is bound within handleClick
        // return (
        //     <button onClick={(e) => this.handleClick(e)}>
        //     Click me
        //     </button>
        // );
    }
}
  
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems1 = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  const listItems2 = numbers.map((number, index) =>
    <li key={index}>
      {number}
    </li>
  );
  const listItems3 = numbers.map((number, index) => 
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <div>
      <ul>{listItems1}</ul>
      <ul>{listItems2}</ul>
      <ul>{listItems3}</ul>
    </div>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);