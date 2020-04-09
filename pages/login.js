import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import React from 'react';

import {connect} from 'react-redux';

const Login = (props) => {
	const [message, setMessage] = React.useState('');
	const handleInfo = (e) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value,
		});
	}
	const login = async (e) => {
		const response = await fetch('http://localhost:3000/api/admin/login', {
			method: "POST",
			body: JSON.stringify({username: 'user1', password: 'user1'}),
			headers: {
				"content-type": "application/json",
			},
		}).then(data => {
			if (data.status == 401)
				setMessage('Invalid credentials');
			else	
				return data.json();
		}).then(data => {
			if (data.success) Router.push('/home')
		});
		//if (response.success) Router.push('/home');
	}
	/*const login = async() => {
		const result = await fetch('http://localhost:3000/api/login', {
			method: "POST",
			body: JSON.stringify({name: 'cyrilcabo', password: 'cyri123' }),
			headers: {
				"content-type": "application/json",
			},
		}).then(data => data.json()).then(data => {
			if (data.success) Router.replace('/home');
		});
	};*/
	return (
		<div>
			<h1> Hello, world! </h1>
			<h2> Please LOGIN </h2>
			<input name="name" type="text" onChange={handleInfo} />
			<input name="password" type="password" onChange={handleInfo} />
			{message}
			<button onClick={login}> Login </button>
		</div>
	);
}

Login.getInitialProps = async ({req, res}) => {
	if (req) {
		const result = await fetch('http://localhost:3000/api/authenticate', {
			credentials: 'include',
			headers: {
				'Cookie': req.headers.cookie,
			}
		}).then(data => data.json());
		
		if (result.success) {
			res.writeHead(301, {Location: '/home' });
			res.end();
		}
	}
}

export default Login;