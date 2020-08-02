import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Dashboard from '../../components/Admin/dashboard';

import {connect} from 'react-redux';
import React from 'react';

import {fetchAdminState, fetchCurrentAdminUser} from '../../redux/actions/actions';

const useStyle = makeStyles({
	root: {
		width: '100%',
		display: 'flex',
		padding: 5,
		marginTop: 50,
		minHeight: 400,
	},
	divider: {
		width: '100%',
	}
});

const cellLabel = ['Confirmed', 'PUM', 'PUI', 'Death', 'Recovered'];

const UpdateCases = (props) => {
	const classes = useStyle();
	const [edit, enableEdit] = React.useState(false);
	const [item, updateItem] = React.useState(props.state.city);
	const [tempItem, editItem] = React.useState(props.state.city.state);
	
	const handleEditItem = (name, value) => {
		editItem({
			...tempItem,
			[name]: value,
		});
	}
	const handleEditSave = () => {
		if (edit) {
			updateItem({
				...item,
				state: {
					...tempItem,
				},
			});
			enableEdit(false);
		} else {
			enableEdit(true);
		}
	}
	const cancelEdit = () => {
		editItem(item.state);
		enableEdit(false);
	}
	const saveData = async () => {
		for (let val in item.state) {
			if (item.state[val] != props.state.city.state[val]) {
				const result = await fetch('https://ncovidwatch.herokuapp.com/api/admin/updatecases', {
					method: 'POST',
					body: JSON.stringify({
						id: props.loggedUser.permissions.id.toString(),
						regId: props.loggedUser.permissions.regId.toString(),
						state: item.state,
					}),
					headers: {
						'content-type': 'application/json',
					},
				}).then(data => data.json());
			}
		}
	}
	const tableData = cellLabel.map((name, i) => {
		const labelName = name.toLowerCase();
		return (
			<React.Fragment key={i}>
				<Grid item xs={12} container>
					<Grid item xs={6} container justify="center" alignItems="center">
						{name}
					</Grid>
					<Grid item xs={6} container direction="row" justify="center">
						<Grid item xs={3} md={2} container alignItems="center">
							<IconButton 
								onClick={handleEditItem.bind(this, labelName, tempItem[labelName]+1)}
								color="primary" 
								disabled={!edit}
							> + </IconButton>
						</Grid>
						<Grid item xs={3} md={2} container justify="center" alignItems="center">
							{tempItem[labelName]}
						</Grid>
						<Grid item xs={3} md={2} container alignItems="center">
							<IconButton 
							onClick={handleEditItem.bind(this, labelName, tempItem[labelName]-1)}
							color="secondary" 
							disabled={!edit}
							> - </IconButton>
						</Grid>
					</Grid>
					<Divider className={classes.divider} />
				</Grid>
			</React.Fragment>
		);
	});
	return (
		<Dashboard>
			<Paper className={classes.root} elevation={5}>
				<Grid item container xs={12}>	
					<Grid container item xs={12} justify="center">
						<Typography component="h6"> {item.name} </Typography>
						<Divider className={classes.divider} />
					</Grid>
					{tableData}
				</Grid>
			</Paper>				
			<Button 
				fullWidth 
				color="primary" 
				variant="outlined" 
				style={{marginTop: 20}}
				onClick={handleEditSave}
			> {edit ?'Save' :'Edit'} </Button>
			{edit
				?<Button fullWidth color="secondary" variant="outlined" onClick={cancelEdit}> Cancel </Button>
				:<Button fullWidth color="default" variant="outlined" onClick={saveData}> Update </Button>
			}
		</Dashboard>
	);
}

UpdateCases.getInitialProps = async ({req, res, store}) => {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
 	const auth = await fetch('https://ncovidwatch.herokuapp.com/api/admin/authenticate', {
		method: 'POST',
		credentials: 'include',
		headers: {
			...cookie,
		}
	}).then(data => data.json());
	if (!auth.success) {
		if (req) {
			res.writeHead(301, {Location: '/admin/login'})
			res.end();
		} else {
			Router.replace('/admin/login');
		}
	};
	await store.dispatch(fetchCurrentAdminUser(req));
	const {id, regId} = store.getState().admin.loggedUser.permissions;
	await store.dispatch(fetchAdminState(regId, id));
}

const mapDispatchToProps = {
	
};

export default connect(store => ({state: store.admin.state, loggedUser: store.admin.loggedUser}), mapDispatchToProps)(UpdateCases);