import nextConnect from 'next-connect';
import middleware from '../../../../utils/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get( async (req, res) => {
	const {id, city} = req.query;
	const doc = await req.db.collection("regions").find({_id: id}).project({ cities: {$elemMatch: {_id: city} }}).toArray();
	res.json(doc[0].cities);
});

export default handler;