import database from '../../../../utils/middleware';

export default async function regionPosts (req, res) {
	const {id, index} = req.query;
	const doc = await database().then(db => db.collection("localposts").aggregate([
		{
			$match: {
				_id: id,
			}
		},
		{
			$project: {
				_id: 1,
				name: 1,
				posts: {
					$reduce: {
						input: "$cities",
						initialValue: [],
						in: {
							$concatArrays: ["$$this.posts", "$$value"],
						}
					}
				},
			}
		},
		{
			$unwind: {
				path: "$posts",
				preserveNullAndEmptyArrays: true,
			}
		},
		{
			$sort: {"posts._id": -1}
		},
		{
			$group: {
				_id: "$_id",
				name: {$first: "$name"},
				posts: {
					$push: "$posts"
				}
			}
		},
		{
			$project: {
				_id: 1,
				name: "$name",
				posts: {
					$slice: [
						"$posts",
						parseInt(index),
						5
					],
				}
			}
		}
	]).toArray());
	res.status(200).json({result: doc[0], index: index});
};