import makeStyles from '@material-ui/core/styles/makeStyles';
import {Map, TileLayer, Marker, Popup, CircleMarker} from 'react-leaflet';

import React from 'react';

const useStyle = makeStyles(theme => ({
	root: {
		height: "100%",
		width: "100%",
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	},
}));


const LeafletMap = (props) => {
	const {coor, name, zoom} = props.view;
	const M_TOKEN = 'pk.eyJ1IjoiY3lyaWxjYWJvIiwiYSI6ImNrN3d2MDNsYzA1b3gzZXA3c3JmcWNzNWIifQ.rbobtmKDLApU2HFFikG4FA';
	const classes = useStyle();
	const marker = <Marker position={coor}>
					<Popup> <b> {name} </b> </Popup>
				</Marker>
	return (
		<Map 
			className={classes.root} 
			center={coor} 
			zoom={zoom} 
			dragging={true} 
			doubleClickZoom={true}  
		>
				<TileLayer
					attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
					url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${M_TOKEN}`}
					maxZoom={12}
					minZoom={5}
					tileSize={512}
					zoomOffset = {-1}
					accessToken={M_TOKEN}
					id = 'mapbox/streets-v11'
				/>
				{marker}
		</Map>
	);
}	

export default LeafletMap;
