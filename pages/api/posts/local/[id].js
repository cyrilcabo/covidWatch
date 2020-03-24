import middleware from '../../../../utils/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

const db = [
	{
		name: "Maasin City",
		type: "Local",
		content: "This is my first announcement!",
	},
	{
		name: "Borongan City",
		type: "Local",
		content: "This is a national broadcast!",
	},
];

handler.get(async (req, res) => {
	const {id, index} = req.query;
	const doc = await req.db.collection("localposts").aggregate([
		{
			$match: {
				_id: id,
			}	
		},
		{
			$project: {
				_id: 0,
				name: 1,
				posts: {
					$slice: [
						{
							$reduce: {
								input: "$cities",
								initialValue: [],
								in: {
									$concatArrays: ["$$this.posts", "$$value"],
								}
							}
						},
						parseInt(index),
						5,
					]
				}
			}
		},
	]).toArray();
	res.json({result: doc[0], index: index});
});

export default handler;