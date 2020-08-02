import {Hidden, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Typography} from '@material-ui/core/';
import {makeStyles} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Link from 'next/link';

const useStyles = makeStyles({
	root: {
		zIndex: 1000,
	},
	fullList: {
		width: 250,
	},
	listHeader: {
		margin: 10,
		textAlign: "center",
	},
	title: {
		fontSize: '1.1rem',
		margin: 0,
		fontFamily: 'serif',
	},
	brandLogo: {
		height: '1rem',
	}
});

let NavDrawer = (props) => {
	const icons = [<HomeIcon />, <AnnouncementIcon />, <InfoIcon />];
	const classes = useStyles();
	let navDrawer = props.nav.map((link, index) => {
		return (
		<Link key={index} href={link.link}>
			<ListItem button>
				<ListItemIcon> {icons[index]} </ListItemIcon>
				<ListItemText primary={
					<Typography component={"h5"}>
						{link.name}
					</Typography>
				} />
			</ListItem>
		</Link>
		);
	});
	return (		
		<Hidden mdUp>
			<Drawer open={props.toggle} onClose={props.toggleDrawer} className={classes.root}>
				<ListSubheader color="inherit" className={classes.listHeader}> 
					<h4 className={classes.title}> <span style={{color: '#b42d1d'}}>C<img className={classes.brandLogo} src="/images/Logo.png" />VID</span>WATCH </h4>
				</ListSubheader>
				<Divider component="li" />
				<div className={classes.fullList}>
					<List>
						{navDrawer}
					</List>
				</div>
			</Drawer>
		</Hidden>
	);
}

export default NavDrawer;