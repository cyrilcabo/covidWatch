import nextConnect from 'next-connect';
import database from '../../utils/middleware';

const pop = async (req, res) => {
    const doc = await database(req, res).then(data => data.collection("regions").find({}).toArray());
	res.status(200).json(doc);
};

export default pop;