import database from '../../../utils/middleware';
import withPassport from '../../../utils/withpassport';

const updateCases = async (req, res) => {
	const result = await database().then(db => db.collection("regions").updateOne(
		{"_id": req.body.regId, "cities._id": req.body.id},
		{$set: {"cities.$.state": req.body.state } }
	)).then(() => ({success: true}));
	res.status(200).json(result);
}

export default withPassport(updateCases);