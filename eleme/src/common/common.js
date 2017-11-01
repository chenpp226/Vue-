import URL from './urlApi.js'

export function handleImg(path){
	//console.log(path)
	if(!path){
		return 
	}else{
		if(path.endsWith('png')){
			path = path+'.png'
		}else if(path.endsWith('jpeg')){
			path = path+'.jpeg'
		}
		return URL.imgHost+path;
	}
	
}
