import React from 'react';
import SearchField from './searchfield';
import SearchResults from './searchresults';

const PureSearch = (props) => {
	const [search, setSearch] = React.useState(props.searchValue);
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchor] = React.useState(null);
	const [results, setResults] = React.useState([]);
	const handleSearch = (e) => {
		setSearch(e.target.value);
		setOpen(true);
		setAnchor(e.target.parentElement.parentElement);
		setResults(props.items.filter(item => item.name.toUpperCase().includes(e.target.value.toUpperCase())));
	};
	let handleSelectLocation = (e) => {
		props.handleLocation(e);
		setSearch(e.name);
		setOpen(false);
	};
	let handleClickAway = () => setOpen(false);
	let handleClear = () => {
		setSearch("");
		props.handleLocation({});
		props.resetState();
		setResults(props.items.filter(item => item));
	};
	return (
		<React.Fragment>			
			<SearchField 
				handleClear={handleClear} 
				handleSearch={handleSearch}
				search={search} 
			/>
			<SearchResults 
				anchorEl={anchorEl}
				open={open} 
				results={results} 
				handleClickAway={handleClickAway} 
				handleSelectLocation={handleSelectLocation}
			/>
		</React.Fragment>
	);
}

export default PureSearch;