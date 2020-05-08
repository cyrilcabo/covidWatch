import withPassport from '../../../utils/withpassport';

const login = async (req, res, passport) => {
	await new Promise ((resolve, reject) => passport.authenticate('local', (err,user,info) => {
		if (user) {
			resolve(req.login(user, (err) => {
				console.log(err);
			}));
		}
		reject('nouser');
	})(req, res, (...args) => {})).then(() => res.status(200).json({success: true, user: req.user})).catch(err => res.status(401).json({success: false}));
}

export default withPassport(login);