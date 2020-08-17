import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Dashboard from '../../components/Admin/dashboard';

import {connect} from 'react-redux';
import fetch from 'isomorphic-unfetch';
import React from 'react';
import Router from 'next/router';

import {fetchAdminState, fetchCurrentAdminUser} from '../../redux/actions/actions';

const useStyle = makeStyles(theme => ({
	root: {
		marginTop: 40,
		[theme.breakpoints.down('xs')]: {
			padding: '0px 5px',
		},
	locDetails: {
		padding: 5,
		fontSize: '2rem',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			fontSize: '1.5rem'
		}
		
	},
	announcement: {
		'& > div.MuiInputBase-root': {
			height: 300,
			display: 'flex',
			alignItems: 'flex-start',
		},
		marginTop: 10,
		marginBottom: 10,
	},
}));

const PostAnnouncement = (props) => {
	const classes = useStyle();
	const [filter, setFilter] = React.useState("local");
	const [message, setMessage] = React.useState({color: "", message: ""});
	const [post, setPost] = React.useState({title: "", name: props.state.city.name, content: ""});
	const handleFilter = (e) => {
		setFilter(e.target.value);
		setPost({
			...post,
			type: e.target.value,
		});
	};
	const handleTitle = (e) => {
		setPost({
			...post,
			title: e.target.value,
		});
	};
	const handleContent = (e) => {
		setPost({
			...post,
			content: e.target.value,
		});
	};
	const handlePost = async () => {
		const valid = () => {
			for (let item in post) {
				if (!post[item]) return false;
			}
			return true;
		}
		if (valid()) {
			await fetch('https://ncovidwatch.herokuapp.com/api/admin/postannouncement', {
				method: 'POST',
				body: JSON.stringify({
					type: filter,
					_id: props.loggedUser.permissions.id.toString(),
					rid: props.loggedUser.permissions.regId.toString(),
					post: {
						...post,
					},
				}),
				headers: {
					'content-type': 'application/json',
				},
			});
			setPost({
				...post,
				title: "",
				content: "",
			});
			setMessage({color: 'green', message: 'Announcement successfully updated!'});
		} else {
			setMessage({color: 'secondary', message: 'Invalid contents, try again.'});
		}
	}
	return (
		<Dashboard>
			<Grid item container xs={12} justify="center" className={classes.root}>
				<Grid item container xs={12} justify="center" spacing={1}>
					<Grid item xs={12} md={6}>
						<Paper className={classes.locDetails} elevation={1} square>
							{props.state.city.name}
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>						
						<FormControl fullWidth>
							<InputLabel> Filter </InputLabel>
							<Select value={filter} onChange={handleFilter}>
								<MenuItem value="national"> National </MenuItem>
								<MenuItem value="local"> Local </MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Grid item container xs={12}>
					<TextField
						fullWidth
						label="Title"
						id="outlined-basic"
						value={post.title}
						onChange={handleTitle}
					/>
					<TextField
						fullWidth
						label="Announcement"
						id="outlined-basic"
						multiline
						className={classes.announcement}
						value={post.content}
						onChange={handleContent}
					/>
				</Grid>
				<Button fullWidth variant="outlined" color="primary" onClick={handlePost} > POST </Button>
				<Typography color={message.color}> {message.message} </Typography>
			</Grid>
		</Dashboard>
	);
}

PostAnnouncement.getInitialProps = async ({req, res, store}) => {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
 	const auth = await fetch('https://ncovidwatch.herokuapp.com/api/admin/authenticate', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Cookie': cookie,
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
	if (req) {
		await store.dispatch(fetchCurrentAdminUser(req));
		const {id, regId} = store.getState().admin.loggedUser.permissions;
		await store.dispatch(fetchAdminState(regId, id));
	}
}

const mapDispatchToProps = {
	
};

export default connect(store => ({state: store.admin.state, loggedUser: store.admin.loggedUser}), mapDispatchToProps)(PostAnnouncement);
