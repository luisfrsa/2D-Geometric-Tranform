/******COMMON*******/
var log = function(s){
	console.log(s);
};
var panel = {
	write:function(s,author){
		var who="<span class='system_console'>Console</span>: ";
		if(typeof(author)!=='undefined' && author=='user'){
			who = "<span class='user_console'>User</span>: ";
		}
		$ul =$('#panel').find('ul'); 
		$ul.append('<li>'+who+s+'</li>');
		panel.scroll();
	},
	clear:function(){
		$('#panel').find('ul').append('<li class="clear_line"></li>');
		panel.scroll();

	},
	clearAll:function(){
		$('#panel').find('ul').html('');

	},
	scroll:function(){
		$ul =$('#panel').find('ul'); 
		$('#panel').scrollTop($ul.height());

	}
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

var LETRAS = ["A","B","C","D","E","F","G","H"];

var WaitClick=0;
var WaitCoord = [];

var $canvas = $('#canvas');
var ctx = canvas.getContext("2d");
var CORP='#3B40E6';


var LAST_ID=0;

var OBJECT_LIST = [];

var TABLE =  Table();

var BUFFER = Buffer();

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
Array.prototype.update=function(new_objs){
	//log(self);
	//log(new_objs);
	return;
	self = this;
	new_objs.forEach(function(new_obj){
		self.removeById(new_obj.id);
		self.push(new_obj);
	});
	self.render();
};
Array.prototype.render=function(){
	blank_canvas();
	this.forEach(function(obj){
		switch(obj.type){
			case 'triangle':
				SHAPE.triangle(obj);
			break;

		}
	});
};
/******GLOBAL*******/

/******CLASS*******/
var Coord = function(x=null,y=null){
	this.x=x;
	this.y=y; 
	this.z=1; 
};
var CURRENT_POS = new Coord();

var resetCanvas = function(){
	$canvas.unbind("click");
	BUFFER.clear();
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
	coords:function(coords){
		var pontos="";
		for(var i=0;i<coords.length;i++){
			Draw.write(LETRAS[i],{x:(coords[i].x-10),y:(coords[i].y-10)});
		}
	},

	line:function(coord){
		var from = coord[0];
		var to = coord[1];

		ctx.beginPath();
		ctx.moveTo(from.x,from.y);
		ctx.lineTo(to.x,to.y);
		ctx.stroke(); 
		ctx.closePath();
		Draw.coords(coord);
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

		Draw.coords([new Coord(from.x,from.y),new Coord(to.x,from.y),new Coord(to.x,to.y),new Coord(from.x,to.y)]);

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

		Draw.coords(coord);

	},
	
	
};
var Object = function(){
	self = this;

	this.reset = resetCanvas;
	this.reset();
	this.id=LAST_ID++;
	this.type=null;
	this.matrix=[];
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
					self.done(self);	
					OBJECT_LIST.add(self);
					var pontos="";
					for(var i=0;i<self.coord.length;i++){
						pontos+=LETRAS[i]+" ("+(self.coord[i].x)+" , "+(self.coord[i].y)+"); ";
					}
					panel.write("Elemento <span class='destaque'>"+self.name+"</span> com id <span class='destaque'>"+self.id +"</span> desenhado no canvas com os pontos <span class='destaque'>"+pontos+"</span>.");

					panel.clear();
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
	$('#current_pos_x').html(CURRENT_POS.x);
	$('#current_pos_y').html(CURRENT_POS.y);
});
