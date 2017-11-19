
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
			Draw.write(LETRAS[i%LETRAS.length],{x:(coords[i].x-10),y:(coords[i].y-10)});
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
		var A = coord[0];
		var B = coord[1];
		var C = coord[2];
		var D = coord[3];

		ctx.beginPath();
		ctx.moveTo(A.x,A.y);
		ctx.lineTo(B.x,B.y);
		ctx.lineTo(C.x,C.y);
		ctx.lineTo(D.x,D.y);
		ctx.lineTo(A.x,A.y);
		ctx.stroke(); 
		ctx.closePath();

		Draw.coords(coord);

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
	poligono:function(coord){
		var A = coord[0];
		var B = coord[1];
		var C = coord[2];

		ctx.beginPath();
		ctx.moveTo(coord[0].x,coord[0].y);

		for (var i=1;i<coord.length;i++){
			ctx.lineTo(coord[i].x,coord[i].y);
		}
		ctx.lineTo(coord[0].x,coord[0].y);

		ctx.stroke(); 
		ctx.closePath();

		Draw.coords(coord);

	},
	
	
};
var Object = function(){
	self = this;

	this.reset = resetCanvas;
	this.reset();
	this.id=LAST_ID;
	this.type=null;
	this.matrix=[];
	this.coord = []; 
	this.waitClick=0;
	this.done=function(){};
	this.select=function(){};
	this.temp_coord = [];
	this.clickEventInit = function(){
		$canvas.on('click',function(){
			$this_canvas = $(this);
			if(self.waitClick>0){
				if(self.type=='rectangle'){
					self.temp_coord.push(new Coord(CURRENT_POS.x,CURRENT_POS.y));
				}else{
					self.coord.push(new Coord(CURRENT_POS.x,CURRENT_POS.y));
				}
				self.waitClick--;	
				if(self.waitClick==0){
					self.done(self);	
					OBJECT_LIST.add(self);
					var pontos="";
					for(var i=0;i<self.coord.length;i++){
						pontos+=LETRAS[i%LETRAS.length]+" ("+(self.coord[i].x)+" , "+(self.coord[i].y)+"); ";
					}
					panel.write("Elemento <span class='destaque'>"+self.name+"</span> com id <span class='destaque'>"+self.id +"</span> desenhado no canvas com os pontos <span class='destaque'>"+pontos+"</span>.");
					panel.clear();
					$this_canvas.unbind("click");
					LAST_ID++;
				}
			}else{
				$this_canvas.unbind("click");
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
