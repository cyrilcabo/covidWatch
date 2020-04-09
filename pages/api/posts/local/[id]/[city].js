import database from '../../../../../utils/middleware';

export default async function getCityPosts (req, res) {
	const {id, city, index} = req.query;
	const doc = await database().then(db => db.collection("localposts").aggregate([
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
	]).toArray());
	res.status(200).json({result: doc[0].cities[0], index: index});
};