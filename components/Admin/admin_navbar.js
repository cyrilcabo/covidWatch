import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import PostAddIcon from '@material-ui/icons/PostAdd';

import Link from 'next/link';
import Router from 'next/router';

import React from 'react';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		backgroundColor: '#ffebeb',
	},
	title: {
		fontSize: '2rem',
		textAlign: 'center',
		margin: '20px 0px 10px 0px',
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem',
		}
	},
	divider: {
		width: '80%',
		backgroundColor: 'gray',
		boxShadow: '0 0 10',
	},
	tabLabel: {
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		}
	},
	brand: {
		fontWeight: 550,
	}
}));

const navItems = [
	{label: "Overview", icon: <DashboardIcon />, link: '/admin/overview'},
	{label: "Update Cases", icon: <AddIcon />, link: '/admin/updatecases'},
	{label: "Announcements", icon: <PostAddIcon />, link: '/admin/postannouncement'},
];


const AdminNavbar = (props) => {
	const classes = useStyle();
	const [view, setView] = React.useState(() => {
		switch(Router.pathname) {
			case '/admin/overview':
				return 0;
			case '/admin/updatecases':
				return 1;
			case '/admin/postannouncement':
				return 2;
			default: return 0;
		}
	});
	const handleView = (i) => setView(i);
	const tabItems = navItems.map((item, i) => {
		return <Link key={i} href={item.link}>
			<Tab label={<p className={classes.tabLabel}> {item.label} </p>} icon={item.icon} onClick={handleView.bind(this, i)} />
		</Link>
	});;
	return (
		<Grid container item xs={12}>
			<Paper className={classes.root}>
				<Grid container item xs={10} justify="center">
					<Grid item container xs={12} justify="center">	
						<Typography component={"h5"} className={classes.title}>
							<span className={classes.brand}> <span style={{color: "#b42d1d"}}>COVID</span>WATCH</span> ADMIN 
						</Typography>
					</Grid>
					<Divider className={classes.divider} />
					<Grid container item xs={12} justify="center">
						<Tabs
							value={view}
							variant="fullWidth"
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							{tabItems}
						</Tabs>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default AdminNavbar;