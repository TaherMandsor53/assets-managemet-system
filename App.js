import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store/Store';
import Home from './components/Home';
import LoginDetailsContainer from './container/LoginDetailsContainer';

class App extends Component {
	render() {
		return (
			<div>
				<Provider store={Store}>
					<Router>
						<Route exact path="/login" component={LoginDetailsContainer}></Route>
						<Route exact path="/home" component={Home}></Route>
					</Router>
				</Provider>
			</div>
		);
	}
}
export default App;
