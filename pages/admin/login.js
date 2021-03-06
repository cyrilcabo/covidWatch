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
		const response = await fetch('https://ncovidwatch.herokuapp.com/api/admin/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'content-type': 'application/json',
			}
		}).then(data => {
			if (data.status == 401) {
				setMessage('Invalid credentials!');
			} else {
				Router.replace('/admin/overview');
			}
		});
	}
	const submit = (e) => {
		e.preventDefault();
		login();
	}
	return (
		<LoginContainer>
			<Head>
				<title> Admin Login </title>
			</Head>
			<form onSubmit={submit}>
				<Grid item container justify="center" alignItems="flex-end">
					<h1> Login </h1>
				</Grid>
				<Grid item container justify="center">
					<Typography color="green" component="p" style={{textAlign: 'center'}}> {(message.register == 'success' && !loginMessage) ?"You have successfully registered! Please login." :loginMessage} </Typography>
				</Grid>
				<Grid item>
					<TextField fullWidth variant="filled" id="username" value={user.username} onChange={handleUser} label="Username" className={classes.inputField}/>
					<TextField fullWidth variant="filled" id="password" type="password" value={user.password} onChange={handleUser} label="Password" className={classes.inputField}/>
				</Grid>
				<Grid item>
					<Button fullWidth color="primary" variant="contained" onClick={login}> Login </Button>
					<Button fullWidth color="secondary" variant="contained" onClick={() => Router.push('/admin/register')}> Register </Button>
				</Grid>
				<input type="submit" style={{display: 'none'}} />
				<Grid item container justify="center">
					<p color="textSecondary"> Not an admin? <a href="/">Visit here.</a> </p>
				</Grid>
			</form>
		</LoginContainer>
	);
}

Login.getInitialProps = async ({req, res}) => {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
	const auth = await fetch('https://ncovidwatch.herokuapp.com/api/admin/authenticate', {
		method: 'POST',
		credentials: 'include',
		headers: {
			...cookie,
		}
	}).then(data => data.json());
	if (auth.success) {
		if (req) {
			res.writeHead(301, {Location: '/admin/overview'})
			res.end();
		} else {
			Router.replace('/admin/overview');
		}
	};
	if (!req) {
		return {client: true};
	}
}

export default Login;