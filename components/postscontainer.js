import React from 'react';
import Post from './post';
import SpanEnd from './Loader/spanend';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';


const PostsContainer = (props) => {
	let items;
	if (props.filter != "national" && props.items.name)
		items = props.posts.local[props.items.name].result;
	else
		items = props.posts.national.result;
	const fetchNext = () => {
		if (props.filter != "national") {
			if (props.items.type == "region") {
				props.fetchRegion(props.items.rid, props.posts.local[props.items.name].index+5);
			} else {
				props.fetchCity({
					region: props.items.rid, 
					city: props.items._id
				}, props.posts.local[props.items.name].index+5);
			}
		} else {
			props.fetchNational(props.posts.national.index+5);
		}
	}
	const more = (props.filter != "national")
					?(!!props.posts.local[props.items.name] && props.posts.local[props.items.name].hasMore)
					:props.posts.national.hasMore;
	const posts = items.map(item => {
		return <Grid item xs={12} container>
			<Post name={item.name} type={item.type} content={item.content} />
		</Grid>
	});
	return (
		<InfiniteScroll
			dataLength={items.length}
			next={fetchNext}
			hasMore={more}
			loader={<h4 style={{textAlign: "center", color: "white"}}> Loading more items... </h4>}
			endMessage={<SpanEnd />}
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{(items.length) ?{posts} :<h5 style={{color: "white"}}> Sorry no posts are available </h5>}
		</InfiniteScroll>
	);
}

export default PostsContainer;