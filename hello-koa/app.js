const koa = require('koa');

const app = new koa();

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

app.use(async (ctx,next)=>{
	await next();
	ctx.response.type='text/html';
	ctx.response.body='<h1>Hello world</h1>';
	
});

app.listen(3002);
console.log('server started');