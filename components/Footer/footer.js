//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import Link from 'next/link';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	footer: {
		minHeight: 100,
		backgroundColor: 'black',
	},
	footerBrandTitle: {
		justify: 'flex-start',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center'
		}
	},
	footerBrandContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',

	},
	footerBrandLogo: {
		height: '1rem',
	},
	footerBrandText: {
		fontSize: '1rem',
		margin: 0,
		color: 'white'
	},
	footerDetails: {
		alignItems: 'flex-end',
		textAlign: 'right',
		[theme.breakpoints.down('sm')]: {
			alignItems: 'center',
			textAlign: 'center',
		}
	},
	footerSlogan: {
		color: '#b42d1d',
		margin: 0,
		fontSize: '0.8rem',
	},
	navContainer: {
		justifyContent: 'flex-end',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	navlink: {
		color: 'white',
		margin: 0,
		fontSize: '0.9rem',
		marginLeft: 15,
		cursor: 'pointer',
		'&:hover': {
			color: '#b42d1d',
		},
		[theme.breakpoints.down('sm')]: {
			margin: '0px 7.5px'
		}
	}
}));

const Footer = (props) => {
	const classes = useStyle();
	const navLinks = props.navs.map((item, index) => {
		return <Link href={item.link} key={index}>
			<p className={classes.navlink}> {item.name} </p>
		</Link>
	})
	return (
		<Grid item xs={12} container justify="center" alignItems="center" className={classes.footer}>
			<Grid item xs={11} md={10} container justify="space-between">
				<Grid xs={12} md={6} item container className={classes.footerBrandTitle}>	
					<Grid item className={classes.footerBrandContainer}>
						<Grid item container justify="center">
							<img src="/images/Logo.png" className={classes.footerBrandLogo} />
						</Grid>
						<Grid item>
							<h4 className={classes.footerBrandText}> <span style={{color: '#b42d1d'}}>COVID</span>WATCH </h4>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container xs={12} md={6} className={classes.footerDetails} direction="column">
					<Grid item>
						<p className={classes.footerSlogan}> Keep your eyes on the pandemic. </p> 
					</Grid>
					<Grid item container className={classes.navContainer}>
						<Grid item style={{display: 'flex'}}>
							{navLinks}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Footer;
