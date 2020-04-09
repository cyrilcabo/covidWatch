import database from '../../../utils/middleware';

export default async function getRegions (req, res) {
	const {id} = req.query;
	const doc = await database().then(db => db.collection("regions").aggregate([
		{
			$match: {_id: id},
		},
		{
			$project: {
				name: 1,
				value: 1,
				state: {
					$reduce: {
						input: "$cities",
						initialValue: {pum: 0, pui: 0, confirmed: 0, death: 0, recovered: 0},
						in: {
							pum: {$add: ["$$this.state.pum", "$$value.pum"]},
							pui: {$add: ["$$this.state.pui", "$$value.pui"]},
							confirmed: {$add: ["$$this.state.confirmed", "$$value.confirmed"]},
							death: {$add: ["$$this.state.death", "$$value.death"]},
							recovered: {$add: ["$$this.state.recovered", "$$value.recovered"]}
						}
					}
				}
			}
		}
	]).toArray());
	res.status(200).json(doc);
};