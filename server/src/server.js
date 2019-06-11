const app = require('./app');
const logger = require('koa-logger');
const router = require('./controllers/router');

app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server started on port 3000');
});