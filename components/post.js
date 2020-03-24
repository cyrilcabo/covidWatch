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
	},
	avatar: {
		zIndex: 10,
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
			/>
			<Divider />
			<CardContent>
				<Typography color="textPrimary" component="p">
					{props.content}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default Post;