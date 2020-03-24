import Link from 'next/link';
import {Typography, Hidden, Container, Toolbar, Appbar, Button, IconButton, AppBar, Grid} from '@material-ui/core/';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useState} from 'react';
import NavDrawer from './navdrawer';
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
		[theme.breakpoints.up("md")]: {
			marginLeft: 10,
			marginRight: 10,
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
		flexGrow: 1,
	}
}));

const NavBar = () => {
	const classes = useStyle();
	const [toggle, toggleDrawer] = useState(false);
	let navs = [{name: "Home", link: "/"}, {name: "Announcements", link: "/announcements"}, {name: "About", link: "/about"}];
	let navLinks = (style) => navs.map((item, index) => {
		return <Link href={item.link}>
					<Button className={classes.linkContainer} >
						<Typography variant="h6" className={style}>
							{item.name}
						</Typography>
					</Button>
				</Link>
	});
	let drawerToggle = () => toggleDrawer((toggle) ?false :true);
	return (
		<div className={classes.root}>
			<AppBar position="absolute" color="secondary" className={classes.appbar}>
				<Container>
						<Toolbar className={classes.navbar}>
							<Hidden smUp>
								<IconButton edge="start" onClick={drawerToggle} >
									<MenuIcon style={{color: "white"}} />
								</IconButton>
							</Hidden>
							<NavDrawer nav={navs} toggle={toggle} toggleDrawer={drawerToggle}/>
							<Typography variant="h6" className={classes.title} >
								CovidWatch
							</Typography>
							<Hidden xsDown>
								{navLinks(classes.links)}
							</Hidden>
						</Toolbar>	
				</Container>
			</AppBar>
		</div>
	);
};

export default NavBar;