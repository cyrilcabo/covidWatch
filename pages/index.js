import Body from '../components/body';
import Layout from '../components/layout';
import LocationSearch from '../components/Search/locationsearch';
import LocationDetails from '../components/locationdetails';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Head from 'next/head';
import FormControl from '@material-ui/core/FormControl';
import dynamic from 'next/dynamic';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {connect} from 'react-redux';
import {getSearch, fetchAll, setView, fetchRegions, fetchCities} from '../redux/actions/actions';

import fetch from 'isomorphic-unfetch';

const LeafletMap = dynamic(() => import('../components/leafletmap'), {ssr: false, loading: () => <p> loading... </p>});

const useStyle = makeStyles(theme => ({
	first: {
		minHeight: 570,
	},
	second: {
		minHeight: 700,
		padding: '60px 0px 120px 0px',
		backgroundColor: 'black',
		position: 'relative',
		marginBottom: 70,
	},
	title: {
		fontSize: '6rem',
		margin: '0px 0px 30px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '5rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem',
		}
	},
	imgLogo: {
		height: '4.5rem',
		[theme.breakpoints.down('md')]: {
			height: '3.5rem',
		},
		[theme.breakpoints.down('sm')]: {
			height: '2rem',
		},
		[theme.breakpoints.down('xs')]: {
			height: '1.25rem',
		}
	},
	subTitle: {
		margin: '0px 0px 100px 0px',
		fontSize: '1.8rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.5rem',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.2rem',
		}
	},
	CTA: {
		fontFamily: 'serif',
		fontSize: '2rem',
		backgroundColor: '#b42d1d',
		color: 'white',
		padding: '5px 30px',
		borderRadius: '35px',
		lineHeight: '40px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem',
			lineHeight: '25px',
			padding: '5px 20px',
		}
	},
	secondImg: {
		height: '5rem',
		[theme.breakpoints.down('sm')]: {
			height: '3.5rem',
		},
		[theme.breakpoints.down('xs')]: {
			height: '3rem',
		}
	},
	secondTitle: {
		color: 'white',
		margin: '15px 0px 60px 0px',
		fontSize: '3rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
		},
		[theme.breakpoints.down('xs')]: {
			height: '1.5rem',
		}
	},
	mapContainer: {
		margin: '20px 0px',
		backgroundColor: '#1e2125',
	},
	map: {
		height: 400,
		width: '90%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		}
	},
	bottomDesign: {
		position: 'absolute',
		bottom: 0,
		'& > div.MuiGrid-item': {
			height: 15,
			[theme.breakpoints.down('sm')]: {
				height: 8,
			}
		}
	},
}));


const Index = (props) => {
	const classes = useStyle();
	const [loc, setLocation] = React.useState({name: ""});
	const [view, setView] = React.useState("Philippines");
	const resetState = async () => {
		setView("Philippines");
	}
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
			<Grid item xs={12} container justify="center" style={{textAlign: 'center'}}>
				<Grid item xs={11} md={10} container justify="center" alignItems="center" className={classes.first}>
					<Grid item container direction="column" alignItems="center">	
						<Grid item>
							<h4 className={classes.title}> 
								<span style={{color: '#b42d1d'}}>C<img src="/images/Logo.png" className={classes.imgLogo} />VID</span>WATCH 
							</h4>
						</Grid>
						<Grid item>
							<p className={classes.subTitle}>
								Somebody has got to keep their eyes open and on the watch.
							</p>
						</Grid>
						<Grid item>
							<Button className={classes.CTA} href="#watch">
								WATCH
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} container alignItems="center" justify="center" className={classes.second} id="watch">
					<Grid item xs={11} md={8} container direction="column" alignItems="center" justify="center">
						<Grid item container direction="column" alignItems="center">
							<Grid item>
								<img src="/images/Logo.png" className={classes.secondImg} />
							</Grid>
							<Grid item>
								<h2 className={classes.secondTitle}> Watch Your City </h2>
							</Grid>
							<Grid item container justify="center">
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
							<Grid item container justify="center" className={classes.mapContainer}>
								<Grid container className={classes.map} item justify="center" container>
									<LeafletMap view={props.results[view].loc} />
								</Grid>
							</Grid>
							<Grid item container justify="center">
								<LocationDetails items={props.results[view].result} />
							</Grid>
							<Grid item xs={12} container className={classes.bottomDesign}>
								<Grid item xs={12} style={{backgroundColor: '#5b1109'}} />
								<Grid item xs={12} style={{backgroundColor: '#b42d1d'}} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid> 
		</Layout>
	);
}

Index.getInitialProps = async ({req, store}) => {
	if (req || !store.getState().results["Philippines"]) {
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