import { h, Component } from 'preact';
import { Router } from 'preact-router';
import createHashHistory from 'history/createHashHistory';

import { Provider } from 'unistore/preact';
import { store } from '../store';

import Home from '../routes/home';
import Game from '../routes/game';
import Settings from '../routes/settings';

import Map from './game-ui/map';

export default class App extends Component {

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Router onChange={this.handleRoute} history={createHashHistory()}>
            <Home path="/" />
            <Game path="/game" />
            <Settings path="/settings" />
            <Map path="/map" />
          </Router>
        </div>
      </Provider>
    );
  }
}
