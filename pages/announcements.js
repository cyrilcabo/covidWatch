import Layout from '../components/layout';
import Body from '../components/body';
import Post from '../components/post';
import PostsContainer from '../components/postscontainer';
import Filter from '../components/Filter/filter';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {connect} from 'react-redux';

import {getSearch, fetchNationalPosts, fetchLocalRegionPosts, fetchLocalCityPosts} from '../redux/actions/actions';

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		minHeight: "80vh",
	},
	titleContainer: {
		[theme.breakpoints.down("sm")]: {
			justifyContent: "center",
		},
	},
	title: {
		fontSize: "2.5rem",
		color: "white",
	},
	divider: {
		backgroundColor: "gray",
		height: 2,
		marginTop: 10,
	},
	postsContainer: {
		"& > div.infinite-scroll-component__outerdiv": {
			width: "100%",
		}
	},
}));

const db = [
	{
		name: "Tacloban City",
		type: "Local",
		content: "This is my first announcement!",
	},
	{
		name: "Quezon City",
		type: "National",
		content: "This is a national broadcast!",
	},
];


const Announcements = (props) => {
	const classes = useStyle();
	const [currentView, setView] = React.useState("national");
	const [loc, handleLocation] = React.useState({name: ""});
	const [items, setItems] = React.useState({});
	const setLocation = async (e) => {
		handleLocation(e);
		if (e.name) {
			if (!!props.posts.local[e.name]) {
				setItems(e);
			} else {
				if (e.type == "city") {
					await props.fetchLocalCityPosts({
						region: e.rid,
						city: e._id,
					}, 0);
				} else if (e.type == "region") {
					await props.fetchLocalRegionPosts(e.rid, 0);
				}
				setItems(e);
			}
		}
	}
	const resetState = () => false;
	return (
		<Layout>
			<Body className={classes.root}>
				<Grid item container xs={12} md={10} alignItems="flex-start">
					<Grid item xs={12} container justify="center">
						<Grid item xs={12} md={8} className={classes.titleContainer} container >
							<Typography component={"h4"} className={classes.title}>
								Announcements
							</Typography>
						</Grid>
						<Grid item xs={11} md={4} container>
							<Filter 
								resetState={resetState}
								handleLocation={setLocation}
								items={props.search}
								searchValue={loc.name}
								setView={setView}
								currentView={currentView}
							/>
						</Grid>
						<Grid item xs={12}>
							<Divider className={classes.divider} />
						</Grid>
					</Grid>
					<Grid item xs={12} container justify="center" className={classes.postsContainer}>
						<PostsContainer 
							filter={currentView} 
							items={items} 
							posts={props.posts} 
							fetchCity={props.fetchLocalCityPosts}
							fetchRegion={props.fetchLocalRegionPosts}
							fetchNational={props.fetchNationalPosts}
						/>
					</Grid>
				</Grid>
			</Body>
		</Layout>
	);
}

Announcements.getInitialProps = async ({store, req}) => {
	if (req || !store.getState().posts.national.result.length) {
		await store.dispatch(fetchNationalPosts(0));
	}
	if (!store.getState().search.length) {
		await store.dispatch(getSearch());
	}
}

const mapDispatchToProps = {
	getSearch,
	fetchNationalPosts,
	fetchLocalRegionPosts,
	fetchLocalCityPosts
}


export default connect(state => ({search: state.search, posts: state.posts}), mapDispatchToProps)(Announcements);