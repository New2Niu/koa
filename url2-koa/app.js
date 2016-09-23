const koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const app = new koa();
const addControllers = require('./controller');

app.use(async (ctx,next)=>{
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
});

app.use(async (cxt,next)=>{
	let start = new Date().getTime();
	await next();
	let end = new Date().getTime();
	console.log(`Time:${end-start}`);
	
});

addControllers(router);
app.use(bodyparser());
app.use(router.routes());
app.listen(3002);
console.log('server started port:3002');