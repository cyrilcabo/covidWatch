import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		margin: 0,
		marginTop: 60,
	},
	main: {
		backgroundColor: "#1e2125",
		padding: 15,
		[theme.breakpoints.down("xs")]: {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			width: "100%",
		},
	},
	fullWidth: {
		[theme.breakpoints.down("xs")]: {
			paddingLeft: 0,
			paddingRight: 0,
		},
	},
	
}));

const Body = (props) => {
	const classes = useStyle();
	return (
		<div className={classes.root}>
			<br />
			<Container className={classes.fullWidth}>
				<Paper className={[classes.main, props.className]}>
					{props.children}
				</Paper>
			</Container>
		</div>
	);
}

export default Body;