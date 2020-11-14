import Layout from '../components/layout';
import Body from '../components/body';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	first: {
		minHeight: 700,
		[theme.breakpoints.down('sm')]: {
			padding: '50px 0px',
		}
	},
	second: {
		minHeight: 400,
		backgroundColor: '#f8f8f8',
		marginBottom: 50,
		padding: '70px 0px',
	},
	what: {
		fontSize: '2rem',
		margin: 0,
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	title: {
		fontSize: '6rem',
		margin: '0px 0px 20px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '5rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem',
		}
	},
	imgLogo: {
		height: '4.5rem',
		[theme.breakpoints.down('md')]: {
			height: '3.5rem',
		},
		[theme.breakpoints.down('sm')]: {
			height: '2rem',
		},
		[theme.breakpoints.down('xs')]: {
			height: '1.25rem',
		}
	},
	about: {
		textAlign: 'center',
		lineHeight: '40px',
		fontSize: '1.2rem',
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem',
			lineHeight: '30px',
		}
	},
	primary: {
		color: '#b42d1d'
	},
	teamTitle: {
		fontSize: '2.5rem',
		margin: 0,
		marginBottom: 50,
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem'
		}
	},
	imgHolder: {
		height: 130,
		width: 130,
		backgroundColor: 'black',
		marginBottom: 20,
		[theme.breakpoints.down('xs')]: {
			height: 100,
			width: 100,
		}
	},
	contacts: {
		textAlign: 'center',
		'& >div.MuiGrid-item': {
			'& > p': {
				margin: 0,
			},
			'& > a': {
				color: '#235c75',
				textDecoration: 'none',
				'&:hover': {
					color: '#b42d1d'
				}
			},
			marginBottom: 10,
			fontSize: '1.1rem',
		}
	}
}));

const About = () => {
	const classes = useStyle();
	return (
		<Layout>
			<Grid item xs={12}>
				<Grid item xs={12} container justify="center" className={classes.first}>
					<Grid item xs={11} md={10} container direction="column" justify="center" alignItems="center">
						<Grid item>
							<p className={classes.what}> What is </p>
						</Grid>
						<Grid item>
							<h4 className={classes.title}> 
								<span style={{color: '#b42d1d'}}>C<img src="/images/Logo.png" className={classes.imgLogo} />VID</span>WATCH? 
							</h4>
						</Grid>
						<Grid item>
							<p className={classes.about}>
								CovidWatch is a web application aimed to monitor COVID19 cases in the Philippines. As the COVID19 outbreak
								worsens all over the globe, it brings great worries upon each citizen. Therefore, it is essential that all
								persons concerned be provided with substantial and comprehensive updates regarding the outbreak. Compared to
								other COVID19 case trackers, CovidWatch provides the user with updates from the national level down to each 
								and every cities or municipalities in the Philippines. With an easy-to-use navigation search bar, one can 
								check the COVID19 status of any locality in the Philippines, with results shown as, either by Region or by 
								district. CovidWatch provides the user information such as the following: Confirmed cases, PUIs (Persons
								Under Investigation), PUMs (Persons Under Monitoring), Recovered cases, and the number of deaths in each 
								locality. Furthermore, CovidWatch also provides the user updates or announcements provided by the concerned
								authorities, LGUs and the National Government. A user can find updates or announcements from every region or
								city, as well as national announcements.
							</p>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.second} container justify="center">
					<Grid item xs={11} md={10} container direction="column" alignItems="center">
						<Grid item>
							<h2 className={classes.teamTitle}> <span className={classes.primary}>WATCH</span> TEAM </h2>
						</Grid>
						<Grid item>
							<img src="/images/alpha_logo.png" className={classes.imgHolder} />
						</Grid>
						<Grid item className={classes.contacts} container direction="column" alignItems="center">
							<Grid item>
								<p> CovidWatch was created, and is developed by <span className={classes.primary}>Alpha Development</span> </p>
							</Grid>
							<Grid item>
								<a href="https://alphadevop.co" target="_blank"> https://alphadevop.co  </a>
							</Grid>
							<Grid item>
								<a href="mailto:cyrilcabo@gmail.com"> cyrilcabo@gmail.com </a>
							</Grid>
							<Grid item>
								<a href="tel:+639398815697"> +639398815697 </a>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Layout>
	);
}

export default About;