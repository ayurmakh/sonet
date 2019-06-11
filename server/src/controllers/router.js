const Router = require('koa-router');
const router = new Router();
const db = require('../db/db');
const app = require('../app');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

router.post('/signin', async (ctx) => {
	var userData = ctx.request.body;
	console.log(ctx.request.body);
	var res = await db.get(userData.login, userData.pass);
	if (res.result)
		ctx.body = { result: true};
	else
		ctx.body = { result: false};
});

router.post('/signup', async (ctx) => {
	var userData = ctx.request.body;
	var res = await db.add(userData.name, userData.login, userData.pass);
	if (res.result)
		ctx.body = { result: true};
	else
		ctx.body = { result: false};
});

router.get('/users', async (ctx) => {
	ctx.body = await db.list();
});

module.exports = router;