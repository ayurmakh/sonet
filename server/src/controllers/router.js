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
	ctx.body = await db.get(ctx.request.body);
});

router.post('/signup', async (ctx) => {
	ctx.body = await db.add(ctx.request.body);
});

router.get('/users', async (ctx) => {
	ctx.body = await db.list();
});

router.get('/countries', async (ctx) => {
	ctx.body = await db.countries();
});

router.get('/cities', async (ctx) => {
	ctx.body = await db.cities(ctx.url.split('=')[1]);
});

module.exports = router;