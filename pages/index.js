import Body from '../components/body';
import Layout from '../components/layout';
import LocationSearch from '../components/Search/locationsearch';
import LocationDetails from '../components/locationdetails';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import FormControl from '@material-ui/core/FormControl';
import dynamic from 'next/dynamic';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {connect} from 'react-redux';
import {getSearch, fetchAll, setView, fetchRegions, fetchCities} from '../redux/actions/actions';

import fetch from 'isomorphic-unfetch';

const LeafletMap = dynamic(() => import('../components/leafletmap'), {ssr: false, loading: () => <p> loading... </p>});

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
	title: {
		color: "white",
		fontSize: "2rem",
	},
	mapContainer: {
		height: 400,
		width: "100%",
		position: "relative",
		marginTop: 20,
		marginBottom: 20,
		[theme.breakpoints.down('sm')]: {
			height: 300,
		}
	},
	searchContainer: {
		width: "100%",
		zIndex: 999,
	}
}));


const Index = (props) => {
	const classes = useStyle();
	const [loc, setLocation] = React.useState({name: ""});
	const [view, setView] = React.useState("Philippines");
	const resetState = async () => {
		setView("Philippines");
	}
	console.log(props.results);
	const setSearch = async () => {
		if (loc.name) {
			if (!props.results[loc.name]) {
				const data = await fetch(`https://nominatim.openstreetmap.org/search?q=${loc.name}&format=json&countrycodes=PH&limit=1`);
				const res = await data.json();
				const locationDetails = {coor: [res[0].lat, res[0].lon], name: res[0].display_name, zoom: 12};
				if (loc.type == "region") {
					await props.fetchRegions(loc.rid, locationDetails);
				} else {
					await props.fetchCities({region: loc.rid, city: loc._id}, locationDetails);
				}
			}
			setView(loc.name);
		}
	}
	return (
		<Layout>
			<Head>
				<link href="/leaflet/leaflet.css" rel="stylesheet" />
			</Head>
			<Body className={classes.root}>
				<Grid container item xs={10} justify="center">
					<Grid item xs={12} container justify="center">
						<Typography component={"h5"} className={classes.title}>
							Covid Watch
						</Typography>
					</Grid>
					<Grid item container xs={12} justify="center">
						<FormControl fullWidth className={classes.searchContainer} >
							<LocationSearch
								items={props.search}
								searchValue={loc.name}
								setSearch={setSearch}
								resetState={resetState}
								handleLocation={setLocation}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} container justify="center">
						<Grid className={classes.mapContainer} item justify="center" container>
							<LeafletMap view={props.results[view].loc} />
						</Grid>
					</Grid>
					<Grid item xs={12} container justify="center">
						<LocationDetails items={props.results[view].result} />
					</Grid>
				</Grid>
			</Body>
		</Layout>
	);
}

Index.getInitialProps = async ({req, store}) => {
	if (req || !store.getState().results["Philippines"].result.length) {
		await store.dispatch(fetchAll());
	}
	if (!store.getState().search.length) {
		await store.dispatch(getSearch());
	}
}

const mapDispatchToProps = {
	getSearch,
	fetchCities,
	fetchRegions,
	setView,
	fetchAll,
}

export default connect(state => ({search: state.search, results: state.results, view: state.view}), mapDispatchToProps)(Index);