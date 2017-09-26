import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store.js';

import MasterRouter from './MasterRouter.js'

const Main = (
	<Provider store={store}>
		<MasterRouter/>
	</Provider>
);

export default Main;