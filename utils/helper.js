
		{name: "City of Malabon", id: "137502000"},
		{name: "City of Navotas", id: "137503000"},
		{name: "City of Valenzuela", id: "137504000"},
		{name: "City of Las Pinas", id: "137601000"},
		{name: "City of Makati", id: "137602000"},
		{name: "City of Muntinlupa", id: "137603000"},
		{name: "City of Paranaque", id: "137604000"},
		{name: "Pasay City", id: "137605000"},
		{name: "Pateros", id: "137606000"},
		{name: "City of Taguig", id: "137607000"}
		
		
		db.sample.aggregate([
			{
				match: { _id: { ObjectId("5e6cc4faa114fdf5315eae0c") } }
			},
			{
				$reduce: {
					input: "$x",
					initialValue: 0,
					in: { $add: ["$$this", "$$value"] }
				}
			}
		])
		
		db.sample.agregate([ 
			{	$project: 
				{ total: 
					{ $reduce: 
						{ 
							input: "$x", 
							initialValue: 0, 
							in: { $add: ["$$this.state.x", "$$value"] }  
						}
					}
				}
			}  	
		])
		{
			_id: 1,
			x: [
				{_id: 1, state: {x: 1}},
				{_id: 1, state: {x: 2}}
			]
		}
		
		
	let doc = await.req.db.collection("regions").aggregate([
		{
			$match: {_id: "130000000"}
		},
		{
			$project: {
				name: 1,
				value: 1,
				noCities: 1,
				noMunicipalities: 1,
				state: {
					$reduce: {
						input: "$cities",
						initialValue: "$state",
						in: {
							pum: {$add: ["$$this.state.pum", "$$value.pum"] },
							pui: {$add: ["$$this.state.pui", "$$value.pui"] },
							confirmed: {$add: ["$$this.state.confirmed", "$$value.confirmed"] },
							death: {$add: ["$$this.state.death", "$$value.death"] },
							recovered: {$add: ["$$this.state.recovered", "$$value.recovered"] }
						}
					}
				}
			}
		}
	]);
	
	db.localposts.updateMany({}, 
		{
			$set: {
				"cities.$[].posts": [],
			}
		}
	);
	
	!!important
	
	driver_URI: mongodb+srv://admin_covidwatch:<password>@covidwatch-cb7tc.mongodb.net/test?retryWrites=true&w=majority
	mongoshell: mongo "mongodb+srv://covidwatch-cb7tc.mongodb.net/test"  --username admin_covidwatch