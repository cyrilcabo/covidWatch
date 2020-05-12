import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	loginCard: {
		marginTop: 40,
		height: '80vh',
		backgroundColor: '#ffebeb',
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			height: '80%',
		}
	},
}));



const LoginContainer = (props) => {
	const classes = useStyle();
	return (
		<div>
			<Container className={classes.root}>
				<Grid xs={12} sm={6} item>	
					<Paper className={classes.loginCard}>
						<Grid xs={10} container item alignItems="stretch" direction="column" justify="center" spacing={2} style={{height: '100%'}}>
							{props.children}
						</Grid>
					</Paper>
				</Grid>
			</Container>	
			<style global jsx>{`
				body {
					background-color: #f54d41;
					height: 100%;
				}
			`}</style>
		</div>
	);
}

export default LoginContainer;
