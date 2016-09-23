const koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');

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

router.get('/api/json',async (ctx,next)=>{
	ctx.response.type = 'application/json';
	ctx.response.body={
		name:'ray',
		password:'123'
	}
})

router.get('/',async (ctx,next)=>{
	ctx.response.body=`
		<form action='/login' method='post'>
			name:<input type='text' name='name' placeholder='name'/>
			password:<input type='password' name='password' placeholder='password'/>
			submit:<button type='submit'>提交</button>
		</form>
	`;
});

router.post('/login',async (ctx,next)=>{
	let name = ctx.request.body.name||'',
		password = ctx.request.body.password||'' ;

	if(name==='koa'&&password==='123'){
		ctx.response.body=`<h1>hello ${name}</h1>`;
	}else{
		ctx.response.body=`
			<h1>用户名或密码错误</h1>
			<p><a href='/'>Try again</a></p>
		`;

	}
})

router.get('/hello/:name',async (ctx,next)=>{
	let name = ctx.params.name;
	ctx.response.body=`hello ${name}`;
});

app.use(bodyparser());
app.use(router.routes());
app.listen(3002);
console.log('server started port:3002');