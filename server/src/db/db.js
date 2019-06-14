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

module.exports.countries = async function countries() {
	try {
		var res = await client.query('select * from countries');
		return { result: true, rows: res.rows };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.cities = async function cities(countryId) {
	try {
		var res = await client.query(`select * from cities where country=${countryId}`);
		return { result: true, rows: res.rows };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.add = async function add(userData) {
	try {
		await client.query(`insert into usr(
			surname,
			name,
			gender,
			country_id,
			city_id,
			phone,
			email,
			pass
		) values(
			\'${userData.surname}\',
			\'${userData.name}\',
			\'${userData.gender}\',
			${userData.countryId},
			${userData.cityId},
			\'${userData.phone}\',
			\'${userData.email}\',
			\'${userData.pass}\')`);
		return { result: true };
	} catch(err) {
		return { 
			result: false,
			errMess: err.message
		 };
	}
}

module.exports.get = async function get(userData) {
	try {
		var res = await client.query(`select * from usr where (email=\'${userData.login}\' or phone=\'${userData.login}\') and pass=\'${userData.pass}\'`);
		if (res.rows.length > 0)
			return { result: true };
		else
			return { result: false };
	} catch (err) {
		console.log(err);
		return { result: false }
	}
}