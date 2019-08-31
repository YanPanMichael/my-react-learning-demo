import React, { Component } from "react";
import _ from "underscore";
// Method1
class DoubleClick1 extends Component {
  handleEvent = event => {
    switch (event.type) {
      case "click":
        console.log("clicked");
        break;
      case "dblclick":
        console.log("double clicked");
        break;
      default:
        console.log("unhandled", event.type);
    }
  };

  render() {
    return (
      <button onClick={this.handleEvent} onDoubleClick={this.handleEvent}>
        Click me!
      </button>
    );
  }
}

//Method2
let count = 0;
class DoubleClick2 extends Component {
  handleEvent = () => {
    count += 1;
    setTimeout(() => {
      if (count === 1) {
        console.log("single click: ", count);
      } else if (count === 2) {
        console.log("setTimeout onDoubleClick: ", count);
      } else if (count === 3) {
        console.log("setTimeout onThirdClick: ", count);
      }
      count = 0;
    }, 300);
  };

  render() {
    return <button onClick={this.handleEvent}>Click me!</button>;
  }
}

//Method3
let clickTasks = [];
class DoubleClick3 extends Component {
  handleClick = () => {
    const clickTask = _.debounce(() => {
      console.log("single click: ");
      clickTasks = [];
    }, 300);
    clickTasks.push(clickTask);
    clickTask();
  };

  handleDoubleClick = () => {
    if (clickTasks.length > 0) {
      _.map(clickTasks, (task) => {
        console.log('Double click: ');
        task.cancel();
      });
      clickTasks = [];
    }
  }

  render() {
    return <button onClick={this.handleClick}>Click me!</button>;
  }
}

export { DoubleClick1, DoubleClick2, DoubleClick3 };
