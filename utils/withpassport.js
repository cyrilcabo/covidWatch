import passport from 'passport';
import database from './middleware';
import passportConfig from './passportconfig';
import fetch from 'isomorphic-unfetch';
import local from 'passport-local';
import {withSession} from 'next-session';
import { ObjectId } from 'mongodb';

const LocalStrategy = local.Strategy;

const authenticateUser = async (username, password, done) => {
	return done(null, {
		id: 100091,
		name: 'Cyril Cabo',
		permissions: {
			id: '137503000',
			regId: '130000000',
		}
	});
	/*try {	
		//if i use await inside here, user returns undefined.
		const user = await database().then(db => db.collection('users').findOne({_id: 100091}));
		//const {user} = await result;
		if (user)
			return done(null, user);
		else 
			return done(null, false);
	} catch (e) {
		return done()
	}*/
}

passport.use(new LocalStrategy(authenticateUser));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async(id, done) => {
	const user = await database().then(db => db.collection('users').findOne({_id: id}));
	return done(null, user)
});

const withPassport = handler => {
	return withSession((req, res) => {passport.initialize()(req, res, () => {
			return passport.session()(req, res, () => {
				return handler(req, res, passport);
			});
		});
	}, {'name': 'cyril'});
}

export default withPassport ;