import fetch from 'isomorphic-unfetch';

const host = 'https://ncovidwatch.herokuapp/com'
//const host = 'http://localhost:3000';

export function fetchCurrentAdminUser (req) {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
	return {
		type: "FETCH_CURRENT_ADMIN_USER",
		payload: fetch(`${host}/api/admin/getcurrentuser`, {
			method: 'GET', 
			credentials: 'include',
			headers: {...cookie}
		}).then(data => data.json()),
	}
}

export function fetchAdminState(regId, id) {
	return {
		type: "FETCH_ADMIN_STATE",
		payload: Promise.all([
			fetch(`${host}/api/getall`).then(data => data.json()),
			fetch(`${host}/api/regions/${regId}`).then(data => data.json()),
			fetch(`${host}/api/regions/${regId}/${id}`).then(data => data.json()),
		]),
	}
}

export function fetchCities(cityObj, loc) {
	return {
		type: "FETCH_CITIES",
		payload: fetch(`${host}/api/regions/${cityObj.region}/${cityObj.city}`).then(data => data.json()).then(result => {
			return {
				result: result,
				loc: loc,
			};
		}),
	}
}

export function fetchRegions(rid, loc) {
	return {
		type: "FETCH_REGIONS",
		payload: fetch(`${host}/api/regions/${rid}`).then(data => data.json()).then(result => {
			return {
				result: result,
				loc: loc,
			};
		}),
	}
}

export function fetchAll () {
	return {
		type: "FETCH_ALL",
		payload: fetch(`${host}/api/getall`).then(data =>  data.json()).then(result => {
			return {
				result: result,
				loc: {
					coor: [12.87, 121.77],
					name: "Philippines",
					zoom: 5,
				},
			}
		}),
	}
}

export function getSearch () {
	return {
		type: "FETCH_SEARCH",
		payload: fetch(`${host}/api/getsearch`).then(data => data.json()),
	}
}

export function setView (view) {
	return {
		type: "SET_VIEW",
		payload: view,
	}
}

export function fetchNationalPosts (index) {
	return {
		type: "FETCH_NATIONAL_POSTS",
		payload: fetch(`${host}/api/posts/national?index=${index}`).then(data => data.json()),
	}
}

export function fetchLocalRegionPosts (id, index) {
	return {
		type: "FETCH_LOCAL_REGION_POSTS",
		payload:  fetch(`${host}/api/posts/local/${id}?index=${index}`).then(data => data.json()),
	}
}

export function fetchLocalCityPosts (cityObj, index) {
	return {
		type: "FETCH_LOCAL_CITY_POSTS",
		payload: fetch(`${host}/api/posts/local/${cityObj.region}/${cityObj.city}?index=${index}`).then(data => data.json()),
	}
}