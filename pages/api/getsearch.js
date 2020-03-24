import middleware from '../../utils/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

handler.get( async (req, res) => {
	let regions = await req.db.collection("regions").aggregate([
		{
			$project:  {
				_id: 0,
				rid: "$_id",
				name: 1,
				value: 1,
				type: "region",
			}
		}
	]).toArray();
	let cities = await req.db.collection("regions").aggregate([ 
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
	]).toArray();
	res.json([...cities[0].cities, ...regions]);
	res.send("it worked");
});

export default handler;