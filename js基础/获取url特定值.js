var str = 'http://www.baidu.con/?lx=1&anme=AA&sex=man#teacher';
function strXI(str){
	
	// 获取
	
	var indexASK = str.indexOf("?");
	
	var indexWELL = str.indexOf('#');
	
	var indexStr = '';
	
	if(indexWELL>-1){
		
		//=>存在＃
		
		indexStr = str.substring(indexASK+1,indexWELL)
		
	}else{
		
		indexStr = str.substr(indexASK+1)
		
	}
	
	var ary = indexStr.split('&')
	
	var obj = {}
	
	for(var i=0;i<ary.length;i++){
		
		var item = ary[i];
		
		var itemAry = item.split('=');
		
		obj[itemAry[0]] = itemAry[1]
		
	}
	
	return obj
	
}

console.log(strXI(str));
