const { Client } = require('pg');
const client = new Client({
	user: 'postgres',
 	host: 'localhost',
    database: 'koa',
    password: '',
    port: 5432    
});

client.connect();

module.exports.list = async function list() {
	try {
		var res = await client.query('select * from usr');
		return { result: true, rows: res.rows };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.add = async function add(name, login, pass) {
	try {
		await client.query(`insert into usr(name, login, pass) values(\'${name}\', \'${login}\', \'${pass}\')`);
		return { result: true };
	} catch(err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.get = async function get(login, pass) {
	try {
		var res = await client.query(`select * from usr where login=\'${login}\' and pass=\'${pass}\'`);
		if (res.rows.length > 0)
			return { result: true, name: res.rows[0].name };
		else
			return { result: false };
	} catch (err) {
		console.log(err);
		return { result: false }
	}
}