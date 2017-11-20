/******COMMON*******/
var log = function(s){
	console.log(s);
};

var calcDist = function(from,to){
	return Math.sqrt(Math.pow(from.x-to.x,2)+Math.pow(from.y-to.y,2)).toFixed(2);
}
var getMiddle = function(from,to){
	//return new Coord((Math.abs(from.x)+Math.abs(to.x))/2,(Math.abs(from.y)+Math.abs(to.y))/2);
	return new Coord(parseInt((from.x+to.x)/2),parseInt((from.y+to.y)/2));
}
var getMiddleCoords = function(args){
	var x=0,y=0,count=0;
	for(var i=0;i<args.length;i++){
		count++;
		x+=args[i].x;
		y+=args[i].y;
	}
	return new Coord(parseInt(x/count),parseInt(y/count));
}
var getMiddleZoom = function(args){
	var menorX=Number.MAX_SAFE_INTEGER,
	    menorY=Number.MAX_SAFE_INTEGER,
	    maiorX=0,
	    maiorY=0;
	for(var i=0;i<args.length;i++){
		if(args[i].x < menorX){
			menorX = args[i].x;
		}
		if(args[i].y < menorY){
			menorY = args[i].y;
		}
		if(args[i].x > maiorX){
			maiorX = args[i].x;
		}
		if(args[i].y > maiorY){
			maiorY = args[i].y;
		}
	}
	return new Coord(parseInt((maiorX+menorX)/2),parseInt((maiorY+menorY)/2));
}
/*var agetMiddleCoords = function(args){
	//return new Coord((Math.abs(from.x)+Math.abs(to.x))/2,(Math.abs(from.y)+Math.abs(to.y))/2);
	return new Coord(parseInt((args[0].x+args[1].x+args[2].x)/3),parseInt((args[0].y+args[1].y+args[2].y)/3));
}*/
/******COMMON*******/