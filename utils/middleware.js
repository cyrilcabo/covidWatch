import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function database() {
	return new Promise (async (resolve) => {
	  if (!client.isConnected()) await client.connect();
	 const  dbClient = client;
	 const db = client.db('covidWatch');
	  resolve(db);
	});
}

export default database;