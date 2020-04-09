import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';



const useStyle = makeStyles({
	root: {
		height: '100%',
		minHeight: 200,
		paddingTop: 5,
		backgroundColor: '#cf9a96',
	},
	bar: {
		width: '100%',
		height: 20,
		color: 'white',
		textAlign: 'center',
	}
})

const colors = ['black', 'maroon', 'gray', 'pink', '#463131'];


const Chart = (props) => {
	const classes = useStyle();
	const {city, pLocal} = props; 
	const rawData = [
		{
			name: 'PUM',
			payload: pLocal.state.pum ?`${Math.round((city.state.pum/pLocal.state.pum)*100)}%` :'0%',
		},
		{
			name: 'PUI',
			payload: pLocal.state.pui ?`${Math.round((city.state.pui/pLocal.state.pui)*100)}%` :'0%',
		},
		{
			name: 'Confirmed',
			payload: pLocal.state.confirmed ?`${Math.round((city.state.confirmed/pLocal.state.confirmed)*100)}%` :'0%',
		},
		{
			name: 'Death',
			payload: pLocal.state.death ?`${Math.round((city.state.death/pLocal.state.death)*100)}%` : '0%',
		},
		{
			name: 'Recovered',
			payload: pLocal.state.recovered ?`${Math.round((city.state.recovered/pLocal.state.recovered)*100)}%` :'0%',
		}
	];
	const data = rawData.map((item, index) => {
		return (
			<Grid item container xs={12}>
				<span className={classes.bar} style={{width: item.payload, backgroundColor: `${colors[index]}`}}>
					{item.payload}
				</span>
			</Grid>
		);
	});
	const legend = rawData.map((item, index) => {
		return (
			<Grid item xs={4} container justify="center" direction="column" alignItems="center">
				<span className={classes.bar} style={{backgroundColor: `${colors[index]}`, width: 20}} />
				{item.name}
			</Grid>
		);
	});
	return (
		<Paper elevation={1}>
			<Grid xs={12} className={classes.root} container item justify="flex-start" alignItems="center">
				{data}
				<Grid xs={12} container justify="center" item>
					{legend}
				</Grid>
			</Grid>
		</Paper>
	);
}

export default Chart;