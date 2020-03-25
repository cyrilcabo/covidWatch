import database from '../../../../utils/middleware';

export default async function regionPosts (req, res) {
	const {id, index} = req.query;
	const doc = await database(req, res).then(db => db.collection("localposts").aggregate([
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
	]).toArray());
	res.status(200).json({result: doc[0], index: index});
};