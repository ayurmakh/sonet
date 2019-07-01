const { Client } = require('pg');
const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'koa',
	password: '',
	port: 5432
});
const fs = require('fs');

client.connect();

module.exports.getCountries = async () => {
	try {
		var res = await client.query('select * from countries');
		return { result: true, rows: res.rows };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.getCategories = async () => {
	try {
		var res = await client.query('select * from categories');
		let categories = [];
		res.rows.forEach(item => categories.push(item.name));
		return { result: true, rows: categories };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.getCities = async countryId => {
	try {
		var res = await client.query(`select * from cities where country_id=${countryId}`);
		return { result: true, rows: res.rows };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.getGoods = async category => {
	try {
		var res = await client.query(`select * from goods where category=${category}`);
		res.rows.forEach(item => item.img = new Buffer(fs.readFileSync(item.img_path)).toString('base64'));
		return { result: true, rows: res.rows };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
};

module.exports.addUsr = async userData => {

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
	} catch (err) {
		return {
			result: false,
			errMess: err.message
		};
	}
}

module.exports.getUsr = async userData => {
	try {
		var res = await client.query(`select * from usr where (email=\'${userData.login}\' or phone=\'${userData.login}\') and pass=\'${userData.pass}\'`);
		if (res.rows.length > 0)
			return true ;
		else
			return false;
	} catch (err) {
		console.log(err);
		return false;
	}
}

module.exports.addCookie = async data => {
	try {
		let cookie = data + new Date();
		await client.query(`insert into cookies (cookie) values (\'${cookie}\')`);
		return { result: true, value: cookie};
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.getCookie = async cookie => {
	try {
		let res = await client.query(`select * from cookies where (cookie=\'${cookie}\')`);
		if (res.rows.length > 0)
			return { result: true };
		return { result: false };
	} catch (err) {
		console.log(err);
		return { result: false };
	}
}

module.exports.deleteCookie = async cookie => {
	try {
		await client.query(`delete from cookie where (cookie=${cookie})`);
	} catch (err) {
		console.log(err);
	}
}