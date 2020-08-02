import Layout from '../layout';
import Body from '../body';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Head from 'next/head';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import React from 'react';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

const AdminNavbar = dynamic(() => import('./admin_navbar'), {ssr: false});

const useStyle = makeStyles(theme => ({
	root: {
		marginTop: 50,
		marginBottom: 100,
		width: '80%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		}
	},
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 60,
		minHeight: 500,
	},
	navbar: {
		backgroundColor: 'black',
	},
	toolbar: {
		display: 'flex',
	},
	appTitle: {
		fontSize: '1.2rem',
		margin: 0,
		flex: 1,
	},
}));

const Dashboard = (props) => {
	const classes = useStyle();
	const logout = async () => {
		const response = await fetch('https://ncovidwatch.herokuapp.com/api/admin/logout').then(res => res.json());
		if (response.success) Router.replace('/admin/login');
	}
	const navbar = <AppBar position="absolute" className={classes.navbar}>
		<Container>
			<Toolbar className={classes.toolbar}>
				<h4 className={classes.appTitle}> <span style={{color: '#b42d1d'}}>COVID</span>WATCH </h4>
				<IconButton edge="end" onClick={logout}>
					<ExitToAppIcon style={{fill: 'white'}} />
				</IconButton>
			</Toolbar>
		</Container>
	</AppBar>;
	
	return (
		<Layout navbar={navbar} noFooter>
			<Toolbar />
			<Container className={classes.root}>	
				<AdminNavbar/>
				<Paper className={classes.container} square>
					<Grid item container xs={12} sm={8} justify="center">
						{props.children}
					</Grid>
				</Paper>
			</Container>
			<style global jsx>{`
				body {
					background-color: #200a0a;
				}
			`}</style>
		</Layout>
	);
}

export default Dashboard;
