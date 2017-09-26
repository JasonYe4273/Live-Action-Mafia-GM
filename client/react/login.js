import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import Form from './util/form.js';
import TextField from './util/materialUI/TextField.js';
import TextFieldPassword from './util/materialUI/TextFieldPassword.js';

import { login } from '../redux/actions/session.js';

@connect(null, dispatch => ({
	login: () => {
		dispatch(login());
	},
	pushToCreateAccount: () => {
		dispatch(push('/createAccount'));
	}
}))
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loginOpen: false
		};
	}
	
	_openLogin = () => {
		this.setState({
			loginOpen: true
		});
	};
	
	_closeLogin = () => {
		this.setState({
			loginOpen: false
		});
	};
	
	render() {
		return (
			<div>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					overflow: 'hidden'
				}}>
					<p style={{fontSize: '2em'}}>Live Action Mafia GM</p>
					
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'stretch'
					}}>
						<RaisedButton
							primary={true}
							label={"Create an Account"}
							onTouchTap={this.props.pushToCreateAccount}
							style={{margin: 20}}
						/>
						
						<RaisedButton
							primary={true}
							label={"Log In"}
							onTouchTap={this._openLogin}
							style={{margin: 20}}
						/>
					</div>
				</div>

				<Dialog
					modal={false}
					open={this.state.loginOpen}
					onRequestClose={this._closeLogin}
					contentStyle={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Form
						header="Log In"
						formName={"login"}
						numInputs={2}
						nextText={"Log in"}
						nextFunc={this.props.login}
						nextStyle={{textAlign: 'center'}}
					>
						<TextField varName={"email"} hintText={"Email"}/>
						<TextFieldPassword varName={"password"} hintText={"Password"}/>
					</Form>
				</Dialog>
			</div>
		);
	}
}