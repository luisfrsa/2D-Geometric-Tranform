/******COMMON*******/
var log = function(s){
	console.log(s);
};
var panel = {
	write:function(s){$('#panel').html(s)},
	clear:function(){$('#panel').html("")},
}
var calcDist = function(from,to){
	return Math.sqrt(Math.pow(from.x-to.x,2)+Math.pow(from.y-to.y,2)).toFixed(2);
}
var getMiddle = function(from,to){
	//return new Coord((Math.abs(from.x)+Math.abs(to.x))/2,(Math.abs(from.y)+Math.abs(to.y))/2);
	return new Coord((from.x+to.x)/2,(from.y+to.y)/2);
}
var getMiddleTriangle = function(args){
	//return new Coord((Math.abs(from.x)+Math.abs(to.x))/2,(Math.abs(from.y)+Math.abs(to.y))/2);
	return new Coord((args[0].x+args[1].x+args[2].x)/3,(args[0].y+args[1].y+args[2].y)/3);
}
/******COMMON*******/

/******GLOBAL*******/

var WaitClick=0;
var WaitCoord = [];

var $canvas = $('#canvas');
var ctx = canvas.getContext("2d");
var CORP='#3B40E6';


var LAST_ID=0;

var OBJECT_LIST = [];

var TABLE =  Table();

Array.prototype.add = function(el){
	this.push(el);
	TABLE.updateTabele(this);
}
Array.prototype.findById = function(id){
	this.forEach(function(el){
		if(el.id==id){
			return el;
		}
		return null;
	});
}
Array.prototype.removeById = function(id){
	this.filter(function(el){
		return el.id!=id;
	});
}
Array.prototype.getActives = function(arrIds){
	var arrReturn = [];
	this.forEach(function(thisEl){
		arrIds.forEach(function(id){
			if(thisEl.id==id){
				arrReturn.push(thisEl);
				return true;
			}
		});
	});
	return arrReturn;
}
/******GLOBAL*******/

/******CLASS*******/
var Coord = function(x=null,y=null){
	this.x=x;
	this.y=y; 
};
var CURRENT_POS = new Coord();

var resetCanvas = function(){
	$canvas.unbind("click");
	
}
var Draw = {
	write:function(string,middle){
		ctx.beginPath();
		ctx.textAlign="center"; 
		ctx.fillStyle=CORP; 
		ctx.font = "15px Arial";
		ctx.fillText(string,middle.x,middle.y);
		ctx.closePath();
	},

	line:function(coord){
		var from = coord[0];
		var to = coord[1];

		ctx.beginPath();
		ctx.moveTo(from.x,from.y);
		ctx.lineTo(to.x,to.y);
		ctx.stroke(); 
		ctx.closePath();
	},
	rect:function(coord){
		var from = coord[0];
		var to = coord[1];

		ctx.beginPath();
		ctx.moveTo(from.x,from.y);
		ctx.lineTo(from.x,to.y);
		ctx.lineTo(to.x,to.y);
		ctx.lineTo(to.x,from.y);
		ctx.lineTo(from.x,from.y);
		ctx.stroke(); 
		ctx.closePath();
	},
	circle:function(coord){
		var from = coord[0];
		var to = coord[1];
		radius = calcDist(from,to);

		ctx.beginPath();
		ctx.arc(from.x,from.y,radius,0,2*Math.PI);
		ctx.stroke();
		ctx.closePath();
	},
	triangle:function(coord){
		var A = coord[0];
		var B = coord[1];
		var C = coord[2];

		ctx.beginPath();
		ctx.moveTo(A.x,A.y);
		ctx.lineTo(B.x,B.y);
		ctx.lineTo(C.x,C.y);
		ctx.lineTo(A.x,A.y);
		ctx.stroke(); 
		ctx.closePath();
	},
	
	
};
var Object = function(){
	self = this;

	this.reset = resetCanvas;
	this.reset();

	this.id=LAST_ID++;
	this.type=null;
	this.coord = []; 
	this.waitClick=0;
	this.done=function(){};
	this.select=function(){};
	this.clickEventInit = function(){
		$canvas.on('click',function(){
			if(self.waitClick>0){
				self.coord.push(new Coord(CURRENT_POS.x,CURRENT_POS.y));
				self.waitClick--;	
				if(self.waitClick==0){
					self.done(self.coord);	
					$(this).unbind("click");
				}
			}else{
				$(this).unbind("click");
			}
		});
	}
}
/******CLASS*******/



$canvas.on('mousemove',function($elem){
	CURRENT_POS.x = $elem.offsetX;
	CURRENT_POS.y = $elem.offsetY;
	$('#current_pos_x').html(CURRENT_POS.x/100);
	$('#current_pos_y').html(CURRENT_POS.y/100);
});
