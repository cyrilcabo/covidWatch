import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';

import PureSearch from './puresearch';

const useStyle = makeStyles(theme => ({
	button: {
		height: "100%",
		[theme.breakpoints.down("sm")]: {
			marginTop: 10,
		}
	},
}));


const LocationSearch = (props) => {
	const classes = useStyle();
	return (
		<Grid container item xs={12}>
			<Grid item xs={12} md={10} container>
				<PureSearch 
					searchValue={props.searchValue} 
					items={props.items}
					handleLocation={props.handleLocation}
					resetState={props.resetState}
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Button 
					fullWidth 
					className={classes.button} 
					onClick={props.setSearch} 
					variant="contained" 
					color="primary"> 
					Search <SearchIcon />
				</Button>
			</Grid>
		</Grid>
	);
};

export default LocationSearch;