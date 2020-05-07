import React from "react";
import ReactDOM from "react-dom";
// Flux & Redux imports
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// custom imports
import { MainView } from "./components/main-view/main-view";
import moviesApp from './reducers/reducers';

// import statement to indicate you need to bundle './index.scss';
import "./index.scss";

const store = createStore(moviesApp);

// Main component (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of your App:
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element:
ReactDOM.render(React.createElement(MyFlixApplication), container);
