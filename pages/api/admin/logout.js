import withPassport from '../../../utils/withpassport';


const Logout = (req, res) => {
	req.logout();
	res.status(200).json({success: true});
}

export default withPassport(Logout);