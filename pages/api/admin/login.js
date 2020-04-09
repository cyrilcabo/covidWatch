import withPassport from '../../../utils/withpassport';

const login = async (req, res, passport) => {
	let a;
	let user;
	passport.authenticate('local')(req, res, (...args) => {});
	if (req.user) {
		res.status(200).json({success: true, user: req.user});
	} else {
		res.status(401).json({success: false});
	}
	console.log(req.user);
}

export default withPassport(login);