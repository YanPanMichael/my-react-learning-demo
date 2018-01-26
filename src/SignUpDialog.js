import React, { Component } from 'react';
import './SignUpDialog.css';

class FancyBorder extends Component {
    render() {
        return (
            <div className={'FancyBorder FancyBorder-' + this.props.color}>
                {this.props.children}
            </div>
        );
    }
}

//使用 children 属性将子元素直接传递到输出。
//<FancyBorder> JSX 标签内的任何内容都将通过 children 属性传入 FancyBorder。
//由于 FancyBorder 在一个 <div> 内渲染了 {props.children}，所以被传递的所有元素都会出现在最终输出中。
class Dialog extends Component {
    render() {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    {this.props.title}
                </h1>
                <p className="Dialog-message">
                    {this.props.message}
                </p>
                {this.props.children}
            </FancyBorder>
        );
    }
}

function WelcomeDialog() {
    return (
      <Dialog
        title="Welcome"
        message="Thank you for visiting our spacecraft!" />
    );
}


class SignUpDialog extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render () {
        return (
            <Dialog title="Mars Exploration Program"
                    message="How should we refer to you?">
                    <input value={this.state.login}
                        onChange={this.handleChange} />
                    <button onClick={this.handleSignUp}>
                        Sign Me Up!
                    </button>
            </Dialog>
        )
    }
}


//------------------====================-----------------===================----------
//虽然不太常见，但有时你可能需要在组件中有多个入口，
//这种情况下你可以使用自己约定的属性而不是 children
function Contacts() {
    return <div className="Contacts" />;
}

function Chat() {
    return <div className="Chat" />;
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
        <div className="SplitPane-left">
            {props.left}
        </div>
        <div className="SplitPane-right">
            {props.right}
        </div>
        </div>
    );
}

function SplitPaneContainer() {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            } />
    );
}


export default SignUpDialog;