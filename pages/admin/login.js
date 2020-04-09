import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import fetch from 'isomorphic-unfetch';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import LoginContainer from '../../components/Admin/logincontainer';

const useStyle = makeStyles({
	inputField: {
		"& div.MuiInputBase-root": {
			backgroundColor: 'white',
		}
	},
});

const Login = (props) => {
	const classes = useStyle();
	const [loginMessage, setMessage] = React.useState('');
	const [user, setUser] = React.useState({username: '', password: ''});
	const message = (props.client) ?Router.query :'';
	const handleUser = (e) => setUser({...user, [e.target.id]: e.target.value});
	const login = async () => {
		console.log(user);
		const response = await fetch('http://localhost:3000/api/admin/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'content-type': 'application/json',
			}
		}).then(data => {
			if (data.status == 401)
				setMessage('Invalid credentials!');
			else	
				return data.json();
		}).then(data => {
			if (data.success) Router.replace('/admin/overview');
		});
	}
	return (
		<LoginContainer>
			<Head>
				<title> Admin Login </title>
			</Head>
			<React.Fragment>
				<Grid item container justify="center" alignItems="flex-end">
					<h1> Login </h1>
				</Grid>
				<Grid item container justify="center">
					<Typography color="green" component="p" style={{textAlign: 'center'}}> {(message.register == 'success') ?"You have successfully registered! Please login." :loginMessage} </Typography>
				</Grid>
				<Grid item>
					<TextField fullWidth variant="filled" id="username" value={user.username} onChange={handleUser} label="Username" className={classes.inputField}/>
					<TextField fullWidth variant="filled" id="password" value={user.password} onChange={handleUser} label="Password" className={classes.inputField}/>
				</Grid>
				<Grid item>
					<Button fullWidth color="primary" variant="contained" onClick={login}> Login </Button>
					<Button fullWidth color="secondary" variant="contained" onClick={() => Router.push('/admin/register')}> Register </Button>
				</Grid>
				<Grid item container justify="center">
					<p color="textSecondary"> Not an admin? Visit here. </p>
				</Grid>
			</React.Fragment>
		</LoginContainer>
	);
}

Login.getInitialProps = async ({req, res}) => {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
	const auth = await fetch('http://localhost:3000/api/admin/authenticate', {
		method: 'POST',
		credentials: 'include',
		headers: {
			...cookie,
		}
	}).then(data => data.json());
	if (auth.success) {
		res.writeHead(301, {Location: '/admin/overview'})
		res.end();
	};
	if (!req) {
		return {client: true};
	}
}

export default Login;