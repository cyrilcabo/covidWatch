import withPassport from '../../../utils/withpassport';

const authenticate = (req, res, passport) => {
	res.json({success: req.isAuthenticated()});
}

export default withPassport(authenticate);