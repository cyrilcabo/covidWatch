import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const states = ['Confirmed', 'PUM', 'PUI', 'Death', 'Recovered'];

const InfoCard = (props) => {
	const {name, state} = props.item;
	const data = states.map((item) => {
		return (
			<Grid item container xs={4} alignItems="center" justify="center" direction="column">
				<Grid item> {state[item.toLowerCase()]} </Grid>
				<Grid item>	{item} </Grid>
			</Grid>
		);
	})
	return (
		<Paper style={{backgroundColor: 'black', color: 'white', height: '100%', padding: 3}}>
			<Grid xs={12} item container justify="center" spacing={1} style={{height: '100%'}}>
				<Grid item xs={12} container justify="center" style={{textAlign: 'center'}}>
					<h1> {name} </h1>
				</Grid>
				<Grid item xs={12} container justify="center" alignItems="flex-end">
					{data}
				</Grid>
			</Grid>
		</Paper>
	);
}

export default InfoCard;