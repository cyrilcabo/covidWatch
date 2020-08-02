import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyle = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		marginTop: 20,
	},
})

const SpanEnd = () => {
	const classes = useStyle();
	return <div className={classes.root}>
		<h4 style={{margin: 0}}> -- <span style={{color: '#b42d1d'}}>END</span> -- </h4>
	</div>
}

export default SpanEnd;