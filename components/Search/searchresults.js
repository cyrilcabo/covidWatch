import {Popper, Fade, Paper, Typography, List, ListItem, ListItemText, Divider, Grid} from '@material-ui/core/';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';

const useStyle = makeStyles({
	container: {
		width: "100%",
		flex: 1,
		zIndex: "9999 !important",
	},
	text: {
		flex: 1,
	},
	resultItem: {
		'&:hover' : {
			backgroundColor: "#343a40",
			boxShadow: "0px 0px 5px",
			borderRadius: 5,
		}
	}
});

const SearchResults = (props) => {
	const classes = useStyle();
	const results = props.results.map((item, i) => {
		if (i <= 5) {	
			return (
				<React.Fragment key={i}>
					<ListItem onClick={props.handleSelectLocation.bind(this, item)} className={classes.resultItem}>
						<ListItemText
							primary={
								<Grid container>
									<Typography className={classes.text}> {item.name} </Typography>
									<Typography color="secondary" > {item.type} </Typography>
								</Grid>
							}
							secondary={(item.type == "region") ?item.value :item.region}
						/>
					</ListItem>
					<Divider component="li" />
				</React.Fragment>
			);
		}
	});
			
	return (
		<React.Fragment>
			<Popper
				modifiers={{
				  flip: {
					enabled: false,
				  },
				  preventOverflow: {
					enabled: false,
					boundariesElement: 'scrollParent',
				  },
				  hide: {
					  enabled: true,
				  },
				}}
				container={props.anchorEl} 
				className={classes.container} 
				open={props.open} 
				placement={"bottom-start"} 
				anchorEl={props.anchorEl} 
				transition
			>
				{({TransitionProps}) => (
					<Fade {...TransitionProps} timeout={250}>
						<Paper>			
							<ClickAwayListener onClickAway={props.handleClickAway} >
									<List>
										{results.length
											? results
											: <ListItem>
												<ListItemText
													primary="Sorry no results are found..."
													secondary="Try other locations..."
												/>
											  </ListItem>
										}
									</List>
							</ClickAwayListener>
						</Paper>
					</Fade>
				)}
			</Popper>
		</React.Fragment>
	);
};

export default SearchResults;