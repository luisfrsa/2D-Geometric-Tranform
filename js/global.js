/******GLOBAL*******/
var WaitClick=0;
var WaitCoord = [];
var LETRAS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var $canvas = $('#canvas');
var ctx = canvas.getContext("2d");
var CORP='#3B40E6';


var LAST_ID=0;

var OBJECT_LIST = [];

var TABLE =  Table();
var TRANSFORM = transform();
var BUFFER = Buffer();



/******GLOBAL*******/

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
/*
not used
*/
Array.prototype.update=function(new_objs){
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
			case 'line':
				SHAPE.line(obj);
			break;
			case 'circle':
				SHAPE.circle(obj);
			break;
			case 'rectangle':
				SHAPE.rectangle(obj);
			break;
			case 'poligono':
				SHAPE.poligono(obj);
			break;
		} 
	});
	TABLE.updateTabele(this);
};