import nextConnect from 'next-connect';
import middleware from '../../utils/middleware';

const handler = nextConnect();

handler.use(middleware);

const cities = [
		{name: "Basilan", id: "150700000"}, 
		{name: "Lanao del Sur", id: "153600000"},
		{name: "Maguindanao", id: "153800000"},
		{name: "Suli", id: "156600000"},
		{name: "Tawi-tawi", id: "157000000"},
	];

const temp = cities.map(item => {
	return {	
		_id: item.id, 
		name: item.name, 
		state: {
			pum: 0,
			pui: 0,
			confirmed: 0,
			death: 0,
			recovered: 0,
		},
	}
});

handler.get(async (req, res) => {
    let doc = await req.db.collection("regions").find().toArray();
	res.json(doc);
});

export default handler;