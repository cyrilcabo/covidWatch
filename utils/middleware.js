import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res) {
	return new Promise (async (resolve) => {
	  if (!client.isConnected()) await client.connect();
	  req.dbClient = client;
	  req.db = client.db('covidWatch');
	  resolve(req.db);
	});
}

export default database;