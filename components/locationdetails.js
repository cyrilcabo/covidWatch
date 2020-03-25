import {Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core/';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		width: "100%"
	}
});

const LocationDetails = (props) => {
	const classes = useStyle();
	const data = props.items.map((item, i) => {
		const {name, state} = item;
		return (
			<TableRow key={i}>
				<TableCell> {name} </TableCell>
				<TableCell> {state.confirmed} </TableCell>
				<TableCell> {state.pum} </TableCell>
				<TableCell> {state.pui} </TableCell>
				<TableCell> {state.death} </TableCell>
				<TableCell> {state.recovered} </TableCell>
			</TableRow>
		);
	})
	return (
		<TableContainer className={classes.root} component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell> Location </TableCell>
						<TableCell> Confirmed </TableCell>
						<TableCell> PUM </TableCell>
						<TableCell> PUI </TableCell>
						<TableCell> Deaths </TableCell>
						<TableCell> Recovered </TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default LocationDetails;