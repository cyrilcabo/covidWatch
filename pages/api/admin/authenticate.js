import withPassport from '../../../utils/withpassport';

const authenticate = (req, res, passport) => {
	res.json({success: req.isAuthenticated()});
	console.log(req.user);
}

export default withPassport(authenticate);