import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyle = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		marginTop: 20,
	},
	span: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: "gray",
		boxShadow: "0 0 0 10",
		marginLeft: 5,
		marginRight: 5,
	},
})

const SpanEnd = () => {
	const classes = useStyle();
	const span = [1,2,3].map((i) => {
		return <span className={classes.span} key={i}></span>
	});
	return <div className={classes.root}>
		{span}
	</div>
}

export default SpanEnd;