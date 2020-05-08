import withPassport from '../../../utils/withpassport';

const getcurrentuser = (req, res) => {
	if (req.user)
		res.json(req.user);
	else 
		res.json({status: 'err'});
}

export default withPassport(getcurrentuser);