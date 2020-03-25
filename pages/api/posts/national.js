import database from '../../../utils/middleware';

export default async function getNationalPosts (req, res) {
	const {index} = req.query;
	const doc = await database(req, res).then(db => db.collection("nationalposts").find().limit(5).skip(parseInt(index)).toArray());
	res.status(200).json({result: doc, index: index});
};