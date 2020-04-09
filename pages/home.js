import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import withPassport from '../utils/withpassport';

import {connect} from 'react-redux';

const Home = (props) => {
	//Protect page from unauthorized access
	const authenticate = async() => {
		const result = await fetch('http://localhost:3000/api/authenticate').then(data => data.json());
		if (!result.success) Router.push('/login');
		console.log(result);
	};
	//authenticate();
	//console.log(props.search);
	const logout = async () => {
		const response = await fetch('http://localhost:3000/api/logout', {
			method: 'POST',
		}).then(data => data.json());
		if (response.success) Router.push('/login');
	}
	return (
		<div>
			<h1> Welcome home, Cyril </h1>
			<h4> Please logout! </h4>
			<button onClick={logout}> Logout </button>
		</div>
	);
}

Home.getInitialProps = async ({req, res}) => {
	if (req) {
		const result = await fetch('http://localhost:3000/api/authenticate', {
			credentials: 'include',
			headers: {
				'Cookie': req.headers.cookie,
			}
		}).then(data => data.json());
		
		if (!result.success) {
			res.writeHead(301, {Location: '/login'})
			res.end();
		};
	}
}

export default Home;