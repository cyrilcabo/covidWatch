import middleware from '../../../utils/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

const db = [
	{
		name: "Maasin City",
		type: "Local",
		content: "This is my first announcement!",
	},
	{
		name: "Borongan City",
		type: "National",
		content: "This is a national broadcast!",
	},
];

handler.get(async (req, res) => {
	const {index} = req.query;
	const doc = await req.db.collection("nationalposts").find().limit(5).skip(parseInt(index)).toArray();
	res.json({result: doc, index: index});
});

export default handler;