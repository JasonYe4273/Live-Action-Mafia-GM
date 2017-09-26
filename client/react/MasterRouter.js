import 'babel-polyfill';

import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import store, { browserHistory } from '../redux/store.js';

import App from './App.js';

/** Routes */
const MasterRouter = () => (
	<ConnectedRouter history={browserHistory}>
		<div>
			<Route path="/" component={App}/>
		</div>
	</ConnectedRouter>
);

export default MasterRouter;