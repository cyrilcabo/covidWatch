import database from '../../../../utils/middleware';

export default async function getCity (req, res) {
	const {id, city} = req.query;
	const doc = await database().then(db => db.collection("regions").find({_id: id}).project({ cities: {$elemMatch: {_id: city} }}).toArray());
	res.status(200).json(doc[0].cities);
};