let str = 'http://www.baidu.con/?lx=1&anme=AA&sex=man#teacher';
function strXI(str){

	// 获取

	let indexASK = str.indexOf("?");

	let indexWELL = str.indexOf('#');

	let indexStr = '';

	if(indexWELL>-1){

		//=>存在＃

		indexStr = str.substring(indexASK+1,indexWELL)

	}else{

		indexStr = str.substr(indexASK+1)

	}

	let ary = indexStr.split('&')

	let obj = {}

	for(let i=0;i<ary.length;i++){

		let item = ary[i];

		let itemAry = item.split('=');

		obj[itemAry[0]] = itemAry[1]

	}

	return obj

}

console.log(strXI(str));

