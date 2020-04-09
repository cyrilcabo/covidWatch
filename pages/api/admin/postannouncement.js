import database from '../../../utils/middleware';
import withPassport from '../../../utils/withpassport';
import { ObjectId } from 'mongodb';

const postAnnouncement = async (req, res) => {
	const type = req.body.type;
	console.log(req.body.rid);
	const result = (type=="local")
		? await database().then(db => {
			return db.collection("localposts").updateOne(
				{
					"_id": req.body.rid,
					"cities._id": req.body._id,
				},
				{
					$push: {
						"cities.$.posts": {
							$each: [{
								_id: ObjectId(),
								...req.body.post,
							}],
							$position: 0,
						},
					},
				},
			);
		}).catch(e => console.log(e)).then(() => ({success: true}))
		: await database().then(db => db.collection("nationalposts").insertOne(req.body.post)).then(() => ({success: true}));;
	console.log(result);
	res.json(result);
}

export default withPassport(postAnnouncement);