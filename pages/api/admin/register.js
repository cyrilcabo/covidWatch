import database from '../../../utils/middleware';
import withPassport from '../../../utils/withpassport';

const register = async (req, res, passport) => {
	const {location, username, password} = req.body;
	const result = await database().then(db => db.collection('users').insertOne({
		username: username,
		password: password,
		permissions: {
			id: location._id,
			regId: location.rid,
		},
	})).then(data => data.insertedCount);
	console.log(result);
	res.status(200).json({success: result ?true : false});
}

export default withPassport(register);