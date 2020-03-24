import Layout from '../components/layout';
import Body from '../components/body';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		color: "white",
	},
	title: {
		fontSize: "2.5rem",
	},
	divider: {
		backgroundColor: "white",
		width: "100%",
	},
	about: {
		"& > h6": {
			fontSize: "1.5rem",
		},
		"& > p.info": {
			textAlign: "justify",
		},
		"& > p.dev": {
			textAlign: "center",
		},
		[theme.breakpoints.down('sm')]: {
			justifyContent: "center",
			"& > p": {
				textAlign: "center",
			},
		},
	},
	
}));

const About = () => {
	const classes = useStyle();
	return (
		<Layout>
			<Body className={classes.root}>
				<Grid xs={12} md={10} container justify="center" spacing={5}>
					<Grid item container xs={12} justify="flex-start">
						<Typography component={"h5"} className={classes.title}>
							About
						</Typography>
						<Divider className={classes.divider} />
					</Grid>
					<Grid item container xs={12} className={classes.about} justify="center">
						<Typography component={"h6"}>
							What is <b>CovidWatch</b>?
						</Typography>
						<Typography component={"p"} className={"info"}>
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
						</Typography>
					</Grid>
					<Grid item container xs={12} direction="column" className={classes.about} alignItems="center">
						<Typography component={"h6"}>
							About the developer
						</Typography>
						<Typography component={"p"} className={"dev"}>
							CovidWatch was created, and is developed by Cyril Cabo. <br />
							https://github.com/cyrilcabo <br />
							cyrilcabo@gmail.com <br />
							+639398815697 <br />
						</Typography>
					</Grid>
					<Grid item container xs={12} direction="column" className={classes.about} alignItems="center">
						<Typography component={"h6"}>
							Contribute
						</Typography>
						<Typography component={"p"} className={"dev"}>
							Contact the developer above if you want to contribute.
						</Typography>
					</Grid>
				</Grid>	
			</Body>
		</Layout>
	);
}

export default About;