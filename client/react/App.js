import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { verifySession } from '../redux/actions/session.js';

// MaterialUI Theme
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme(baseTheme);

import AppRouter from './AppRouter.js';
import AppBar from './AppBar.js';

import Loading from './Loading.js';
import Success from './Success.js';

@connect(state => ({
	inSession: state.inSession
}), {
	verifySession
})
export default class App extends React.Component {
	// This is needed for MUI.
	static childContextTypes = {
		muiTheme: PropTypes.object.isRequired
	};
	
	// This is needed for MUI.
	getChildContext = () => {
		return {muiTheme};
	};

	componentWillMount() {
		if (this.props.inSession === -1) {
			this.props.verifySession(true);
		}
	}
	
	render() {
		return (this.props.inSession === -1 ? (
			<div>
				<Loading />
				<Success />
			</div>
		) : (
			<div>
				<Loading />
				<Success />
				
				<AppBar />
				<AppRouter/>
			</div>
		));
	}
}