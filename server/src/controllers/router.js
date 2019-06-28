const router = require('koa-router')();
const db = require('../db/db');
const app = require('../app');
const bodyParser = require('koa-bodyparser');
const tools = require('../tools/tools');

app.use(bodyParser());
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
	ctx.set('Access-Control-Allow-Headers', 'Content-Type');
	ctx.set('Access-Control-Allow-Credentials', 'true');
    await next();
});


router.get('/', async ctx => {
	if (ctx.header.cookie)
		ctx.body = await db.getCookie(ctx.header.cookie.split('=')[1]);
	else
		ctx.body = { result: false};
});

router.get('/logout', async ctx => {
	await db.deleteCookie(ctx.header.cookie.split('=')[1]);
});

router.post('/signin', async ctx => {
	let result = false;
	if (await db.getUsr(ctx.request.body)) {
		let cookie = await db.addCookie(ctx.request.body.login);
		if (cookie.result)
			ctx.cookies.set('cookie', cookie.value);
		result = true;
	}
	ctx.body = { result: result };
});

router.post('/signup', async ctx => {
	ctx.cookies.set('cookie', await db.addCookie(ctx.request.body.phone + ctx.request.body.email));
	ctx.body = await db.addUsr(ctx.request.body);
});

router.get('/countries', async ctx => {
	ctx.body = await db.getCountries();
});

router.get('/cities', async ctx => {
	ctx.body = await db.getCities(ctx.url.split('=')[1]);
});

module.exports = router;