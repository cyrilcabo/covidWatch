import fetch from 'isomorphic-unfetch';

const mock = async (req, res) => {
	const getuser = async () => {
		const result = await fetch('http://localhost:3000/api/admin/authenticateuser', {
			method: 'POST',
			body: JSON.stringify({
				username: 'user1',
				password: 'user1',
			}),
			headers: {
				'content-type': 'application/json',
			}
		}).then(data => data.json());
		console.log(result);
	}
	getuser();
}

export default mock;