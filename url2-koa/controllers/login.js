let fn_index = async (ctx,next)=>{
	ctx.response.body=`
		<form action='/login' method='post'>
			name:<input type='text' name='name' placeholder='name'/>
			password:<input type='password' name='password' placeholder='password'/>
			submit:<button type='submit'>提交</button>
		</form>
	`;
}

let fn_login = async (ctx,next)=>{
	let name = ctx.request.body.name||'',
		password = ctx.request.body.password||'';

	if(name==='koa'&&password==='123'){
		ctx.response.body=`<h1>hello ${name}</h1>`;
	}else{
		ctx.response.body=`
			<h1>用户名或密码错误</h1>
			<p><a href='/'>Try again</a></p>
		`;

	}
}

module.exports={
	'GET /':fn_index,
	'POST /login':fn_login
}