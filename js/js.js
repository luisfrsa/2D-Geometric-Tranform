var Table = function(){

	var clear = function(){
		$('table>tbody').first().html('<tr><th></th><th>Id</th><th>Objeto</th><th>Coordenada pontos</th></tr>');
	}
	var updateTabele = function(objs){
		clear();
		objs.forEach(function(el){
			var tr = document.createElement("tr");
			tr.appendChild(createCheckbox(el.id));
			tr.appendChild(createTd(el.id));
			tr.appendChild(createTd(el.name));
			tr.appendChild(createTdCoord(el.coord));
			$('table>tbody').first().append(tr);
		});
		$('table').find("input").on('change',clickCheckEvent);

	}

	var createTdCoord= function(coord){
		var LETRAS = ["A","B","C","D","E","F","G","H"];
		var str="";
		for(var i=0;i<coord.length;i++){
			str+=LETRAS[i]+" ("+(coord[i].x/100)+" , "+(coord[i].y/100)+"); ";
		}
		return createTd(str);
	}

	var createCheckbox=function (id){
		var cell = document.createElement("td"); 
		var input = document.createElement('input'); 
		input.type = "checkbox";
		input.name = "select[]";
		input.value = id;
		cell.appendChild(input);
		return cell;
	}
	var createTd = function(text){
		var cell = document.createElement("td"); 
		var cellText = document.createTextNode(text); 
		cell.appendChild(cellText);
		return cell;
	}
	var clickCheckEvent = function(){
		if($(this).prop('checked')==true){
			$(this).parent('td').parent('tr').addClass('table_selected');
		}else{
			$(this).parent('td').parent('tr').removeClass('table_selected');
		}
	};
	var getSelecteds = function(){
		var ids = [];
		$('table').find('input').each(function(){
			if($(this).is(':checked')){
				ids.push(parseInt($(this).val()));
			}
		});
		return ids;
	}
	return {
		updateTabele:updateTabele,
		clear:clear,
		getSelecteds:getSelecteds
	}
}
var Buffer = function(){
	var val = '';

	var clear = function(){
		setVal('');
		clearEnterEvent();
	}
	var setVal = function(v){
		val = v;
	}
	var getVal = function(){
		return v;
	}

	var enterEvent = function(){};

	var setEnterEvent = function(fun){
		enterEvent = fun||function(){}; 
	};
	var getEnterEvent = function(){
		return enterEvent;
	};
	var clearEnterEvent = function(){
		getEnterEvent(function(){});
	}
	return {
		clear:clear,
		setVal:setVal,
		getVal:getVal,
		setEnterEvent:setEnterEvent,
		getEnterEvent:getEnterEvent,
		clearEnterEvent:clearEnterEvent,
	}
}

var SHAPE ={
	triangle:function(current){ 
		if(typeof(current)!=='undefined'){
			self = current;
		}else{
			self = this;
		}
		Draw.triangle(self.coord);
		middle = getMiddleTriangle(self.coord);
		Draw.write(self.name+" - "+self.id,middle);
	},
	circle:function(current){ 
		if(typeof(current)!=='undefined'){
			self = current;
		}else{
			self = this;
		}
		Draw.circle(self.coord);
		Draw.write(self.name+" - "+self.id,self.coord[0]);
	},
	line:function(current){ 
		if(typeof(current)!=='undefined'){
			self = current;
		}else{
			self = this;
		}
		Draw.line(self.coord);
		middle = getMiddle(self.coord[0],self.coord[1]);
		Draw.write(self.name+" - "+self.id,middle);
	},
	rectangle:function(current){ 
		if(typeof(current)!=='undefined'){
			self = current;
		}else{
			self = this;
		}
		Draw.rect(self.coord);
		middle = getMiddle(self.coord[0],self.coord[1]);
		Draw.write(self.name+" - "+self.id,middle);
	},
 };
var MATRIX ={
	translation:function(val){
		return [
		[1,0,val.x],
		[0,1,val.y],
		[0,0,1],
		];
	},
	rotation:function(val){
		return [
		[Math.cos(val),-Math.sen(val),0],
		[Math.sen(val),Math.cos(val) ,0],
		[0            ,0             ,1],
		];
	},
	scale:function(val){
		return [
		[val.x,0     ,0],
		[0    ,val.y0,0],
		[0    ,0     ,1],
		];
	},
}

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

/*CONTROLS*/

$('#linha').on('click',function(){
	panel.write("Clique em <span class='destaque'>2</span> pontos para desenhar uma <span class='destaque'>linha</span>.");
	obj = new Object();
	obj.type='line';
	obj.name='Linha';
	obj.waitClick=2;
	obj.done= SHAPE.line;
	obj.clickEventInit();

});

$('#retangulo').on('click',function(){
	panel.write("Clique em <span class='destaque'>2</span> pontos para desenhar um <span class='destaque'>retângulo</span>.");
	obj = new Object();
	obj.type='rectangle';
	obj.name='Retângulo';
	obj.waitClick=2;
	obj.done= SHAPE.rectangle;
	obj.clickEventInit();

});

$('#circunferencia').on('click',function(){
	panel.write("Clique em <span class='destaque'>2</span> pontos para desenhar uma <span class='destaque'>circunfêrencia</span>.");
	obj = new Object();
	obj.type='circle';
	obj.name='Círculo';
	obj.waitClick=2;
	obj.done= SHAPE.circle;
	obj.clickEventInit();

});
$('#triangulo').on('click',function(){
	panel.write("Clique em <span class='destaque'>3</span> pontos para desenhar uma <span class='destaque'>triângulo</span>.");
	obj = new Object();
	obj.type='triangle';
	obj.name='Triângulo';
	obj.waitClick=3;
	obj.done= SHAPE.triangle;
	obj.clickEventInit();

});
var blank_canvas = function(){
	TABLE.clear();
	ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
}
$('#clear').on('click',function(){
	resetCanvas();
	OBJECT_LIST = [];
	blank_canvas();
	
});
/*CONTROLS*/

/*GROMETRIC TRANSFORM*/
$('#input').on('keydown',function(e){
    if(e.which == 13) {
    	var val = $(this).val();
		panel.write(val,'user');
        BUFFER.setVal(val);
        BUFFER.getEnterEvent()(val);
        $(this).val('');
    }
});

var getInputXY = function(str){
	var split = str.split(',');
	return {
		x:parseFloat(split[0]),
		y:parseFloat(split[1]),
	}
}
var coord2Matrix = function(obj){
	var matrix = [];
	for(var i=0; i<obj.length;i++) {
		matrix[0]=[];
		matrix[1]=[];
		matrix[2]=[];
	}
	for(var i=0; i<obj.length;i++) {
    	matrix[0][i] = obj[i].x;
    	matrix[1][i] = obj[i].y;
    	matrix[2][i] = obj[i].z;
    }
    return matrix;
}
var matrix2Coord = function(matrix){
	var coords = [];
	for(var i=0; i<matrix.length;i++) {
		coords.push(new Coord(matrix[0][i],matrix[1][i],matrix[2][i]));
    }
    return coords;
}
var mul_matrix = function(matrix1, matrix2){
    var matrix_result = [];
    for(var i=0; i<matrix1.length;i++) {
        matrix_result[i] = [];
        for (var j=0;j<matrix2[0].length;j++) {
            var sum = 0;
            for(var k=0;k<matrix1[0].length;k++) {
                sum+= matrix1[i][k] * matrix2[k][j];
            }
            matrix_result[i][j] = sum;
        }
    }
    return matrix_result;
}
var translation = function(obj_list,value){
	obj_list.map(function(obj){
		var matrix = coord2Matrix(obj.matrix);
		log(obj);
		log(matrix);
		obj.matrix = mul_matrix(MATRIX.translation(value),matrix);
		obj.coord = matrix2Coord(obj.matrix);
		return obj;
	});
	return fixY(obj_list);
};

var fixY = function(obj_list,heightY){
	heightY = heightY || 550;
	log(obj_list);
	obj_list.map(function(obj){
		obj.matrix.map(function(el){
			return el.map(function(coord){
				coord.y = heightY - coord.y; 
				return coord;
			});
		});
	});
	return obj_list;
}

var obj2Matrix = function(obj_list){
	var matriz=[];
	var cur_obj; 
	for(var i=0;i<obj_list.length;i++){
		cur_obj=obj_list[i];
		matriz[cur_obj.id] = [];
		for(var j=0;j<cur_obj.coord.length;j++){
			matriz[cur_obj.id][j] = cur_obj.coord[j];
		}
		log('matrixxx');
		log(matrix);
		obj_list[i].matrix= matriz;
	}
	log('back');
	log(obj_list);
	return obj_list;
}
var getMatrix = function(OBJ){

}

$('#translacao').on('click',function(){
	panel.clear();
	resetCanvas();
	var ids = TABLE.getSelecteds();
	if(ids.length==0){
		panel.write("Você precisa selecionar ao menos um elemento para realizar a transformação");
		return false;
	}
	
	panel.write("Digite o valor da transformação de XXXX no <span class='destaque'>formato X,Y</span>, e em seguida pressione Enter");
	BUFFER.setEnterEvent(function(val){
		var value = getInputXY(val);
		log('val');log(value);
		var actives = OBJECT_LIST.getActives(ids);
		log('actives');log(actives);
		var matrix_list = fixY(obj2Matrix(actives));
		log('matrix_list');log(matrix_list);
		var transformed = translation(matrix_list,value);
		log('transformed');log(transformed);
		OBJECT_LIST.update(transformed);

	});
});

/*GROMETRIC TRANSFORM*/