
//Material components
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

//Utils
import Link from 'next/link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useState} from 'react';

//Custom component
import NavDrawer from './navdrawer';

//Matrial icon
import MenuIcon from '@material-ui/icons/Menu';

const useStyle = makeStyles( theme => ({
	root: {
		flexGrow: 1,
	},
	appbar: {
		backgroundColor: "black",
		[theme.breakpoints.down("xs")]: {
			height: 65,
		},
	},
	linkContainer:{
		textTransform: 'none',
		[theme.breakpoints.up("md")]: {
			marginLeft: 20,
		}
	},
	links: {
		color: "white",
		fontSize: 14,
		margin: 0,
	},
	navbar: {
		display: "flex",
		flexDirection: "row",
		width: "90%",
		[theme.breakpoints.down("xs")]: {
			paddingTop: 5,
		}
	},
	title: {
		flex: 1,
		color: 'white',
	}
}));

const NavBar = (props) => {
	const classes = useStyle();
	const [toggle, toggleDrawer] = useState(false);
	const navLinks = props.navs.map((item, index) => {
		return <Link href={item.link} key={index}>
					<Button className={classes.linkContainer} >
						<p className={classes.links}>
							{item.name}
						</p>
					</Button>
				</Link>
	});
	const drawerToggle = () => toggleDrawer((toggle) ?false :true);
	return (
		<div className={classes.root}>
			<AppBar position="absolute" color="secondary" className={classes.appbar}>
				<Container style={{display: 'flex', justifyContent: 'center'}}>
						<Toolbar className={classes.navbar}>
							<Hidden smUp>
								<IconButton edge="start" onClick={drawerToggle} >
									<MenuIcon style={{color: "white"}} />
								</IconButton>
							</Hidden>
							<NavDrawer nav={props.navs} toggle={toggle} toggleDrawer={drawerToggle}/>
							<h3 className={classes.title} >
								<span style={{color: '#b42d1d'}}>COVID</span>WATCH
							</h3>
							<Hidden xsDown>
								{navLinks}
							</Hidden>
						</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</div>
	);
};

export default NavBar;