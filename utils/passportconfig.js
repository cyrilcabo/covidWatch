import local from 'passport-local';

const LocalStrategy = local.Strategy;

let a;

const passportConfig = async (passport) => {
	const authenticateUser = async (username, password, done) => {
		const result = await fetch('http://localhost:3000/api/admin/authenticateuser', {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: {
				'content-type': 'application/json',
			}
		}).then(data => data.json());
		const {user} = await result;
		return done(null, user);
	}

	await passport.use(new LocalStrategy(authenticateUser));

	await passport.serializeUser((user, done) => done(null, user.id));
	await passport.deserializeUser((user, done) => done(null, user));

}

export default passportConfig;