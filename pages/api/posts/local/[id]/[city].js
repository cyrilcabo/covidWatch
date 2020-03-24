import middleware from '../../../../../utils/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	const {id, city, index} = req.query;
	const doc = await req.db.collection("localposts").aggregate([
		{
			$match: {
				_id: id,
			},
		},
		{
			$project: {
				cities: {
					$slice: [
						{
							$map: {
								input: {
									$filter: {
										input: "$cities",
										cond: {
											$eq: ["$$this._id", city]
										},
									},
								},
								in: {
									name: "$$this.name",
									posts: "$$this.posts"
								}
							}
						},
						parseInt(index),
						5,
					], 
				},
			}
		}
	]).toArray();
	res.json({result: doc[0].cities[0], index: index});
});

export default handler;