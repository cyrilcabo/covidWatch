import middleware from '../../utils/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	let doc = await req.db.collection("regions").aggregate([
		{
			$group: {
				_id: 0,
				states: {
					$push: {
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
					},
				},
			},
		},
		{
			$project: {
				name: "Philippines",
				state: {
					$reduce: {
						input: "$states",
						initialValue: {pum: 0, pui: 0, confirmed: 0, death: 0, recovered: 0},
						in: {
							pum: {$add: ["$$this.pum", "$$value.pum"]},
							pui: {$add: ["$$this.pui", "$$value.pui"]},
							confirmed: {$add: ["$$this.confirmed", "$$value.confirmed"]},
							death: {$add: ["$$this.death", "$$value.death"]},
							recovered: {$add: ["$$this.recovered", "$$value.recovered"]}
						}
					}
				}
			}
		}
	]).toArray();
	
	res.json(doc);
});

export default handler;