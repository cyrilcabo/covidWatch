import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		width: "100%",
		margin: 10,
		flex: 1,
		boxShadow: '0px 0px 3px gray',
	},
	avatar: {
		zIndex: 10,
		backgroundColor: 'black',
		color: 'white',
	},
	titleHolder: {
		'& span.MuiCardHeader-title': {
			fontFamily: 'serif',
			fontSize: '1.2rem',	
			fontWeight: 540,
		}
	},
	postTitle: {
		fontSize: '1.4rem',
		fontWeight: 550
	}
})


const Post = (props) => {
	const classes = useStyle();
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar className={classes.avatar}>
						{props.name[0]}
					</Avatar>
				}
				title={props.name}
				subheader={props.type}
				className={classes.titleHolder}
			/>
			<Divider />
			<CardContent>
				<Typography className={classes.postTitle} component="h3">
					{props.title}
				</Typography>
				<Typography color="textPrimary" component="p">
					{props.content}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default Post;