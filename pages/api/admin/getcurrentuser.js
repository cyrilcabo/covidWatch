import withPassport from '../../../utils/withpassport';

const getcurrentuser = (req, res) => {
	if (req.user)
		res.json(req.user);
	console.log(req);
}

export default withPassport(getcurrentuser);