import database from '../../utils/middleware';

export default async function getSearch (req, res) {
	const regions = await database().then(db => db.collection("regions").aggregate([
		{
			$project:  {
				_id: 0,
				rid: "$_id",
				name: 1,
				value: 1,
				type: "region",
			}
		}
	]).toArray());
	const cities = await database(req, res).then(db => db.collection("regions").aggregate([ 
		{
			$group: {
				_id: 0,
				cities: {
					$push: {
						$map: {
							input: "$cities",
							in: {
								_id: "$$this._id",
								name: "$$this.name",
								rid: "$_id",
								region: "$name",
								type: "city"
							}
						}
					},
				}
			},
		},
		{
			$project: {
				cities: {
					$reduce: {
						input: "$cities",
						initialValue: [],
						in: {
							$concatArrays: ["$$this", "$$value"]
						}
					}
				}
			}
		}	
	]).toArray());
	res.status(200).json([...cities[0].cities, ...regions]);
};