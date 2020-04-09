import database from '../../../utils/middleware';
import withPassport from '../../../utils/withpassport';

const fetchlocations = async (req, res)  => {
	const result = await database(req, res).then(db => db.collection("regions").aggregate([ 
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
								type: "city",
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
	res.status(200).json(result[0].cities);
}

export default withPassport(fetchlocations);