import makeStyles from '@material-ui/styles/makeStyles';
import {Paper, InputBase, IconButton, Divider} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = makeStyles({
	search: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		flex: 1,
	},
	divider: {
		height: 20,
	},
	input: {
		flex: 1,
		padding: 8,
	},
});


const SearchField = (props) => {
	const classes = useStyle();
	
	return (
		<React.Fragment>
			<Paper  onSubmit={(e) => e.preventDefault()} className={classes.search} id="container" component="form">
				<InputBase onChange={props.handleSearch} value={props.search} className={classes.input} placeholder="Search regions/cities..." />
				{props.search 
					?<IconButton onClick={props.handleClear} color="secondary">
						<CloseIcon />
					</IconButton>
					: ""
				}
				<Divider className={classes.divider} orientation="vertical" />
			</Paper>
		</React.Fragment>
	);
};

export default SearchField;