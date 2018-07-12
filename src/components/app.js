import { h, Component } from 'preact';
import { Router } from 'preact-router';
import createHashHistory from 'history/createHashHistory';
import {} from 'normalize.css';

import Home from '../routes/home';
import Game from '../routes/game';
import Settings from '../routes/settings';

export default class App extends Component {

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Router onChange={this.handleRoute} history={createHashHistory()}>
          <Home path="/" />
          <Game path="/game" />
          <Settings path="/settings" />
        </Router>
      </div>
    );
  }
}
