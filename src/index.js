import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function Welcome(props) {
    return <h1>hello, {props.name}</h1>
}

function Elements() {
    return (
        <div>
            <Welcome name="Haha" />
            <Welcome name="Cande" />
            <Welcome name="Edite" />
        </div>
    )
}

ReactDOM.render(
    <Elements />,
    document.getElementById('root')
);

// registerServiceWorker();
