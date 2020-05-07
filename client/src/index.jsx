import React from "react";
import ReactDOM from "react-dom";
// react-bootstrap import
import Container from 'react-bootstrap/Container';
// import views
import { MainView } from "./components/main-view/main-view";

// import statement to indicate you need to bundle './index.scss';
import "./index.scss";

// Main component (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container className="my-flix" fluid="true">
        <MainView></MainView>
      </Container>
    );
  }
}

// Finds the root of your App:
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element:
ReactDOM.render(React.createElement(MyFlixApplication), container);
