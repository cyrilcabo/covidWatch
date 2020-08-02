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
	titleContainer: {
		justifyContent: 'space-between',
		margin: '80px 0px 15px 0px',
	},
	title: {
		fontSize: '2.4rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '2rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
	},
	container: {
		backgroundColor: '#f8f8f8',
		padding: '20px 0px',
		marginBottom: 60,
	},
	postContainer: {
		minHeight: 500,
		backgroundColor: 'white',
		boxShadow: '0px 0px 5px gray',
		padding: '20px 0px',
		borderRadius: '2px',
		position: 'relative'
	},
	design: {
		position: 'absolute',
		height: 5,
		width: '100%'
	},
	designTop: {
		backgroundColor: '#b42d1d',
		top: 0,
	},
	designBottom: {
		backgroundColor: 'black',
		bottom: 0,
	},
	postsContainer: {
		"& > div.infinite-scroll-component__outerdiv": {
			width: "100%",
		}
	},
}));


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
			<Grid item xs={12} container justify="center">
				<Grid item xs={11} md={10} container alignItems="center" className={classes.titleContainer}>
					<Grid xs={12} item sm={8} lg={9}>
						<h1 className={classes.title}> <span style={{color: '#b42d1d'}}>COVID</span> ANNOUNCEMENTS </h1>
					</Grid>
					<Grid item xs={12} sm={4} lg={3}>
						<Filter 
							resetState={resetState}
							handleLocation={setLocation}
							items={props.search}
							searchValue={loc.name}
							setView={setView}
							currentView={currentView}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} container justify="center" className={classes.container}>
				<Grid item container xs={11} md={10} className={classes.postContainer}>
					<div className={[classes.design, classes.designTop].join(' ')} />
					<div className={[classes.design, classes.designBottom].join(' ')} />
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
			</Grid>
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