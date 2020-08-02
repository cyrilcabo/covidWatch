import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import PureSearch from '../Search/puresearch';

const useStyle = makeStyles(theme => ({
	filter: {
		"& label.MuiFormLabel-root": {
			zIndex: 0,
		},
		"& div.MuiInputBase-root": {
			border: 1,
		},
		marginBottom: 5,
	},
}));

const Filter = (props) => {
	const classes = useStyle();
	const handleFilter = (e) => props.setView(e.target.value);
	const localSearch = <FormControl>
		<Grid item xs={12} container>
			<PureSearch
				searchValue={props.searchValue}
				handleLocation={props.handleLocation}
				items={props.items}
				resetState={props.resetState}
			/>
		</Grid>
	</FormControl>
	return (
		<Grid item xs={12} container direction="column">
			<FormControl fullWidth className={classes.filter}>
				<InputLabel> Filter </InputLabel>
				<Select value={props.currentView} onChange={handleFilter} >
					<MenuItem value="national"> National </MenuItem>
					<MenuItem value="local"> Local </MenuItem>
				</Select>
			</FormControl>
			{(props.currentView=="local"  && localSearch)}
		</Grid>
	);
}

export default Filter;