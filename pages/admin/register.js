import LoginContainer from '../../components/Admin/logincontainer';
import PureSearch from '../../components/Search/puresearch';

import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-unfetch';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {getSearch} from '../../redux/actions/actions';

const useStyle = makeStyles({
	inputField: {
		"& div.MuiInputBase-root": {
			backgroundColor: 'white',
		}
	},
});


const Register = (props) => {
	const classes = useStyle();
	const [fieldState, setFieldState] = React.useState({location: {error: false, msg: ''}, username: {error: false, msg: ''}, password: {error: false, msg: ''}, confirmpassword: {error: false, msg: ''}});
	const [user, setUser] = React.useState({location: '', username: '', password: '', confirmpassword: ''});
	const [items, setItems] = React.useState(props.items);
	const [loc, handleLocation] = React.useState("");
	const resetState = () => setUser({...user, location: ''});
	const setLocation = (e) => {
		handleLocation(e.name);
		setUser({
			...user,
			location: e,
		});
		setFieldState({
			...fieldState,
			location: {error: false, msg: ''},
		});
	}
	const handleUser = (e) => {
		setUser({
			...user,
			[e.target.id]: e.target.value,
		});
	}
	const validate = async (e) => {
		const checkBlank = (id) => {
			setFieldState({
				...fieldState,
				[id]: (!user[id]) ?{error: true, msg: 'Please fill out this field!'} :{error: false, msg: ''},
			});
			if (!user[id]) return false;
		}
		const checkPassword = () => {			
			if (user.confirmpassword) {	
				const pState = (user.password === user.confirmpassword) ?  {error: false, msg: ''}: {error: true, msg: "Passwords don't match."};
				setFieldState({ 
					...fieldState,
					confirmpassword: pState,
					password: pState,
				});
			}
		}
		switch (e.target.id) {
			case 'location':
				checkBlank('location');
				break;
			case 'username':
				checkBlank('username');
				const response = await fetch(`http://localhost:3000/api/admin/validateusername?username=${user.username}`).then(response => response.json());
				setFieldState({
					...fieldState,
					username: (response.success) ?{error: false, msg: ''} :{error: true, msg: 'Username already exists'},
				});
				break;
			case 'password':
				checkBlank('password');
				checkPassword();
				break;
			case 'confirmpassword':
				checkBlank('confirmpassword');
				checkPassword();
				break;
			default: return false;
		}
	}
	const register = async () => {
		let validObj = {}, invalid = false;
		console.log(fieldState);
		for (let valid in user) {
			validObj = {
				...validObj,
				[valid]: (!user[valid]) ?{error: true, msg: 'You cannot leave this blank!'} :fieldState[valid],
			}
			if (!user[valid] || fieldState[valid].error) invalid = true;
		}
		if (invalid) {	
			setFieldState({
				...fieldState,
				...validObj,
			});
		} else {
			const response = await fetch('http://localhost:3000/api/admin/register', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'content-type': 'application/json',
				},
			}).then(data => data.json());
			if (response.success) Router.replace('/admin/login?register=success');
		}
	}
	return (
		<LoginContainer>
			<Head>
				<title> Register </title>
			</Head>
			<React.Fragment>
				<Grid item container justify="center">
					<h1> Register </h1>
				</Grid>
				<Grid item container justify="center" direction="column" alignItems="center" style={{color: '#f54d41'}}>
					<FormControl fullWidth style={{zIndex: 10}}>
						<PureSearch
							items={items}
							searchValue={loc}
							handleLocation={setLocation}
							resetState={resetState}
						/>
					</FormControl>
					{(fieldState['location'].error) ?fieldState['location'].msg :''}
				</Grid>
				<Grid item>
					<TextField 
						fullWidth 
						variant="filled" 
						label={(fieldState['username'].error) ?fieldState['username'].msg :'Username'}
						id="username"
						onChange={handleUser}
						onBlur={validate}
						value={user.username}
						className={classes.inputField}
						error={fieldState['username'].error}
					/>
					<TextField 
						fullWidth 
						variant="filled" 
						label={(fieldState['password'].error) ?fieldState['password'].msg :'Password'}
						id="password"
						onChange={handleUser}
						onBlur={validate}
						value={user.password}
						type="password"
						className={classes.inputField}
						error={fieldState['password'].error}
					/>
					<TextField 
						fullWidth 
						variant="filled" 
						label={(fieldState['confirmpassword'].error) ?fieldState['confirmpassword'].msg :'Confirm password'}
						id="confirmpassword"
						onChange={handleUser}
						onBlur={validate}
						value={user.confirmpassword}
						type="password"
						className={classes.inputField} 
						error={fieldState['confirmpassword'].error}
					/>
				</Grid>
				<Grid item>
					<Button fullWidth variant="contained" color="primary" onClick={register}> Register </Button>
				</Grid>
				<Grid item justify="center" container>
					<Button fullWidth variant="contained" color="secondary"> Login </Button>
					Already registered?
				</Grid>
			</React.Fragment>
		</LoginContainer>
	);
}

Register.getInitialProps = async ({req, res, store}) => {
	const auth = await fetch('http://localhost:3000/api/admin/authenticate', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Cookie': req.headers.cookie,
		}
	}).then(data => data.json());
	if (auth.success) {
		res.writeHead(301, {Location: '/admin/overview'})
		res.end();
	};
	const items = await fetch("http://localhost:3000/api/admin/fetchlocations").then(data => data.json());
	return {items: items};
}

export default connect(state => ({}))(Register);