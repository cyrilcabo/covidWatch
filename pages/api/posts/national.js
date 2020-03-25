import middleware from '../../../utils/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	const {index} = req.query;
	const doc = await req.db.collection("nationalposts").find().limit(5).skip(parseInt(index)).toArray();
	res.json({result: doc, index: index});
});

export default handler;