const fs = require('fs');

const addMapping = (router,ctrlMap)=>{
	Object.keys(ctrlMap).forEach((key)=>{
		if(key.startsWith('GET')){
			let path = key.substring(4);
			router.get(path,ctrlMap[key]);
		}else if(key.startsWith('POST')){
			let path = key.substring(5);
			router.post(path,ctrlMap[key]);
		}else{
			console.log(`invalid path:${key}`);
		}
	})
}

const addControllers = (router)=>{
	let files = fs.readdirSync(__dirname+'/controllers');
	//找到以.js结尾的文件
	let js_files = files.filter((f)=>{
		return f.endsWith('.js');
	});
	js_files.forEach((f)=>{
		let ctrlMap = require(`./controllers/${f}`);
		addMapping(router,ctrlMap);
	})
}

module.exports = addControllers;