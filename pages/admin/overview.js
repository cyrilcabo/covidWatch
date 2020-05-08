import Chart from '../../components/Admin/util/chart';
import InfoCard from '../../components/Admin/util/infocard';
import Dashboard from '../../components/Admin/dashboard';

import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux';
import React from 'react';
import Router from 'next/router';

import {fetchAdminState, fetchCurrentAdminUser} from '../../redux/actions/actions';

const Overview = (props) => {
	return (
		<Dashboard>
			<h1> Overview </h1>
			<Grid container xs={12} item justify="center" spacing={2}>
				<Grid xs={12} item container spacing={2} justify="center">
					<Grid item xs={12} md={6}>
						<InfoCard item={props.state.country} />
					</Grid>
					<Grid item xs={12} md={6}>
						<InfoCard item={props.state.region} />
					</Grid>
					<Grid item xs={12} md={6}>
						<InfoCard item={props.state.city} />
					</Grid>
				</Grid>
				<Grid xs={12} item container justify="space-around" spacing={1}>
					<Grid xs={12} md={5} justify="center" item container>
						<Chart city={props.state.city} pLocal={props.state.region} />
						City:Region ratio
					</Grid>
					<Grid xs={12} md={5} justify="center" item container>
						<Chart city={props.state.city} pLocal={props.state.country} />
						City:Country ratio
					</Grid>
				</Grid>
			</Grid>
		</Dashboard>
	);
}

Overview.getInitialProps = async ({req, res, store}) => {
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

export default connect(store => ({state: store.admin.state}))(Overview);