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
		[theme.breakpoints.down('xs')]: {
			padding: 0,
		}
	},
	loginCardContainer: {
		margin:'80px 0px',
		maxHeight: 500,
		[theme.breakpoints.down('sm')]: {
			margin: '60px 0px',
		},
		[theme.breakpoints.down('xs')]: {
			margin: '40px 0px',
		}
	},
	loginCard: {
		height: '100%',
		height: 500,
		backgroundColor: '#ffebeb',
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('md')]: {
			minHeight: 400,

		}
	},
}));



const LoginContainer = (props) => {
	const classes = useStyle();
	return (
		<div>
			<Container className={classes.root}>
				<Grid xs={12} sm={10} md={8} lg={6} item className={classes.loginCardContainer}>	
					<Paper className={classes.loginCard}>
						<Grid xs={10} container item alignItems="stretch" direction="column" justify="center" spacing={2} style={{height: '100%'}}>
							{props.children}
						</Grid>
					</Paper>
				</Grid>
			</Container>	
			<style global jsx>{`
				body {
					background-color: #98362f;
					height: 100%;
				}
			`}</style>
		</div>
	);
}

export default LoginContainer;
