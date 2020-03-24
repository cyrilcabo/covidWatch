import {combineReducers, createStore, applyMiddleware} from 'redux';
import {store} from '../store';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
//lacks fetch

function resultsReducer (initialState=store.results, action) {
	switch (action.type) {
		case "FETCH_REGIONS_FULFILLED":
		case "FETCH_CITIES_FULFILLED":
		case "FETCH_ALL_FULFILLED":
			return {
				...initialState,
				[action.payload.result[0].name]: {
					result: action.payload.result,
					loc: action.payload.loc,
				},
			};
		default: return initialState;
	}
}

function viewReducer (initialState=store.view, action) {
	switch (action.type) {
		case "SET_VIEW":
			return initialState = action.payload;
		default: return initialState;
	}
}

function searchReducer (initialState=store.search, action) {
	switch (action.type) {
		case "FETCH_SEARCH_FULFILLED":
			return action.payload;
		default: return initialState;
	}
}

function postsReducer (initialState=store.posts, action) {
	switch (action.type) {
		case "FETCH_NATIONAL_POSTS_FULFILLED":
			return {
				...initialState,
				national: {
					result: [
						...initialState.national.result,
						...action.payload.result,
					],
					index:  action.payload.index,
					hasMore: (!(action.payload.result.length < 5)),
				},
			}
		case "FETCH_LOCAL_REGION_POSTS_FULFILLED":
		case "FETCH_LOCAL_CITY_POSTS_FULFILLED":
			const data = (!!initialState.local[action.payload.result["name"]])
							?initialState.local[action.payload.result["name"]].result
							:[];
			return {
				...initialState,
				local: {
					...initialState.local,
					[action.payload.result["name"]]: {
						result: [
							...data,
							...action.payload.result["posts"],
						],
						index: parseInt(action.payload.index),
						hasMore: (!(action.payload.result["posts"].length < 5)),
					},
				},
			}
		default: return initialState;
	}
}

const reducers = combineReducers({
	results: resultsReducer,
	view: viewReducer,
	search: searchReducer,
	posts: postsReducer,
});


const makeStore = (state=store) => {
	return createStore(reducers, state, applyMiddleware(promise, logger));
}

export default makeStore;