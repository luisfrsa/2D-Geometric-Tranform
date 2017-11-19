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
/*var agetMiddleCoords = function(args){
	//return new Coord((Math.abs(from.x)+Math.abs(to.x))/2,(Math.abs(from.y)+Math.abs(to.y))/2);
	return new Coord(parseInt((args[0].x+args[1].x+args[2].x)/3),parseInt((args[0].y+args[1].y+args[2].y)/3));
}*/
/******COMMON*******/
var Table = function(){

	var clear = function(){ 
		$('table>tbody').first().html('<tr><th><input type="checkbox" onclick="window.TABLE.check_all(this)"></th><th>Id</th><th>Objeto</th><th>Coordenada pontos</th></tr>');
	}
	var check_all = function(el){  
		$this = $(el);
		$('table').find('input').each(function(){
			$(this).prop('checked',$this.prop('checked'));
		});
	}
	var updateTabele = function(objs){ 
		clear(); 
		objs.forEach(function(el){
			var tr = document.createElement("tr");
			tr.appendChild(createCheckbox(el.id));
			tr.appendChild(createTd(el.id));
			tr.appendChild(createTd(el.name));
			tr.appendChild(createTdCoord(el,el.coord));
			$('table>tbody').first().append(tr);
		});
		$('table').find("input").on('change',clickCheckEvent);

	}

	var createTdCoord= function(el,coord){
			var str="";
		if(el.type!='rectangle'){
			for(var i=0;i<coord.length;i++){
				str+=LETRAS[i%LETRAS.length]+" ("+parseInt(coord[i].x)+" , "+parseInt(coord[i].y)+"); ";
			}
		}else{
			for(var i=0;i<4;i++){
				str+=LETRAS[i%LETRAS.length]+" ("+parseInt(coord[i].x)+" , "+parseInt(coord[i].y)+"); ";
			}
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
		getSelecteds:getSelecteds,
		check_all:check_all
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

var transform = function(){
	var matrix2Coord = function(matrix){
		var coords = [];
		for(var j=0; j<matrix[0].length;j++) {
			coords[j] = new Coord();
		}
		for(var j=0; j<matrix[0].length;j++) {
			for(var i=0; i<matrix.length;i++) {
				var curren;
				switch(i){
					case 0:
						coords[j].x = matrix[i][j];
						curren='x';
					break;
					case 1:
						curren='y'; 
						coords[j].y = matrix[i][j];
					break;
					case 2:
						curren='z';
						coords[j].z = matrix[i][j];
					break;
				}
		    }
	    }
	    return coords;
	}

	var mul_matrix = function(matrix1, matrix2){
		//log(arguments); 
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
	

	var fixY = function(obj_list,heightY){
		heightY = heightY || 550;
		obj_list.map(function(obj){
			obj.coord.map(function(c){
				c.y = heightY - c.y; 
				return c;
			});
		});
		return obj_list;
	}
	var coord2Matrix = function(obj){
		var matrix = [];
		for(var i=0; i<obj.coord.length;i++) {
			matrix[0]=[];
			matrix[1]=[];
			matrix[2]=[];
		}
		for(var i=0; i<obj.coord.length;i++) {
	    	matrix[0][i] = obj.coord[i].x;
	    	matrix[1][i] = obj.coord[i].y;
	    	matrix[2][i] = obj.coord[i].z;
	    }
	    return matrix;
	}
	var obj2Matrix = function(obj_list){
		for(var i=0;i<obj_list.length;i++){
			obj_list[i].matrix=coord2Matrix(obj_list[i]);
		}
		return obj_list;
		//coord2Matrix
		var cur_obj; 
		for(var i=0;i<obj_list.length;i++){
			var matriz=[];
			cur_obj=obj_list[i];
			for(var j=0;j<cur_obj.coord.length;j++){
				matriz[j]=[];
				//matriz[cur_obj.id][j] = [];
				matriz[j][0] = cur_obj.coord[j].x;
				matriz[j][1] = cur_obj.coord[j].y;
				matriz[j][2] = cur_obj.coord[j].z;
			}
			obj_list[i].matrix= matriz;
		}
		return obj_list;
	}	

	var translation = function(obj,value){
		obj.matrix = mul_matrix(MATRIX.translation(value),obj.matrix);
		obj.coord = matrix2Coord(obj.matrix);
		
		return obj;
	}; 
	var skew = function(obj,value){    
		obj.matrix = mul_matrix(MATRIX.scale(value),obj.matrix); 
		obj.coord = matrix2Coord(obj.matrix);
		return obj;
	}; 
	var rotate_degree = function(obj,value){
		obj.matrix = mul_matrix(MATRIX.rotation(value),obj.matrix);
		obj.coord = matrix2Coord(obj.matrix);
		return obj;
	};

	var getInputXY = function(str){
		var split = str.split(',');
		return {
			x:parseFloat(split[0]),
			y:parseFloat(split[1]),
		}
	}
	var translate_to_origin = function(obj){
		var middle;
		switch(obj.type){
			case "triangle":
			case "line":
			case "rectangle":
			case "forma_livre":
				middle = getMiddleCoords(obj.coord);
			break;
			case "circle":
				middle = obj.coord[0];
			break;

		}	
		return {
			obj:translation(obj,new Coord(-(middle.x),-(middle.y))),
			middle:middle
		};
	}
	var init_common = function(obj_actives){
		var obj_fix_y = fixY(obj_actives);
		return obj2Matrix(obj_fix_y);
	}
	var end_common= function(obj_transformed){
		fixY(obj_transformed);
	}

	var translate = function(obj_actives,value){
		var obj_matrix = init_common(obj_actives);
		obj_matrix.map(function(obj){
			return translation(obj,value);			
		});		
		end_common(obj_matrix);
	}
	var scale = function(obj_actives,value){
		var obj_matrix = init_common(obj_actives);
		obj_matrix.map(function(obj){
			var ret_origin =  translate_to_origin(obj);	
			obj = skew(ret_origin.obj,value);
			return translation(obj,new Coord(ret_origin.middle.x,ret_origin.middle.y));
		});		
		end_common(obj_matrix);
	}
	var rotate = function(obj_actives,degree){
		var obj_matrix = init_common(obj_actives);
		obj_matrix.map(function(obj){
			//return rotate_degree(obj,degree);em relacao a origem
			var ret_origin =  translate_to_origin(obj);	
			//return ret_origin.obj;
			obj = rotate_degree(ret_origin.obj,degree);
			//return obj;
			return translation(obj,new Coord(ret_origin.middle.x,ret_origin.middle.y));
		});		
		end_common(obj_matrix);
	}
	return{
		getInputXY:getInputXY,
		translate:translate,
		scale:scale,
		rotate:rotate,
	}
}

var transformation = function(){
	self = this;
	this.name='';
	this.type='';
	this.format='formato X,Y';
	this.transoform_function='';
	var init = function(ids){
		panel.clear();
		resetCanvas();
		if(ids.length==0){
			panel.write("Você precisa selecionar ao menos um elemento para realizar a transformação");
			return false;
		}
		return true
	}
	this.run = function(){
		var ids = TABLE.getSelecteds();
		if(!init(ids)){
			return false;
		}
		panel.write("Digite o valor da transformação de "+self.type+" no <span class='destaque'>"+self.format+"</span>, e em seguida pressione Enter");
		BUFFER.setEnterEvent(function(val){
			var value = TRANSFORM.getInputXY(val);
			var actives = OBJECT_LIST.getActives(ids);
			self.transoform_function(actives,value);
			OBJECT_LIST.render();
			BUFFER.clearEnterEvent();
		});
	}
}
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
var ZOOM = false;
var BACKUP_OBJSlIST;
/******GLOBAL*******/
/******BUFFER PROTOTYPE*******/

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
	/*
	not used
	*/
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
			case 'forma_livre':
				SHAPE.forma_livre(obj);
			break;
		} 
	});
	TABLE.updateTabele(this);
};
/******BUFFER PROTOTYPE*******/

var SHAPE ={
	triangle:function(current){ 
		if(typeof(current)!=='undefined'){
			self = current;
		}else{
			self = this;
		}
		Draw.triangle(self.coord);
		middle = getMiddleCoords(self.coord);
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

		self.coord.push(new Coord(self.temp_coord[0].x,self.temp_coord[0].y,));
		self.coord.push(new Coord(self.temp_coord[1].x,self.temp_coord[0].y,));
		self.coord.push(new Coord(self.temp_coord[1].x,self.temp_coord[1].y,));
		self.coord.push(new Coord(self.temp_coord[0].x,self.temp_coord[1].y,));

		Draw.rect(self.coord);
		middle = getMiddle(self.coord[0],self.coord[2]);
		Draw.write(self.name+" - "+self.id,middle);
	},
	forma_livre:function(current){  
		if(typeof(current)!=='undefined'){
			self = current;
		}else{
			self = this;
		}
		Draw.forma_livre(self.coord);
		middle = getMiddleCoords(self.coord);
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
		[Math.cos(val* Math.PI / 180.0),-Math.sin(val* Math.PI / 180.0),0],
		[Math.sin(val* Math.PI / 180.0),Math.cos(val* Math.PI / 180.0) ,0],
		[0                             ,0                              ,1],
		];
	},
	scale:function(val){
		return [
		[val.x,0     ,0],
		[0    ,val.y ,0],
		[0    ,0     ,1],
		];
	},
}

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

		for(var i=0;i<4;i++){
			Draw.write(LETRAS[i%LETRAS.length],{x:(coord[i].x-10),y:(coord[i].y-10)});
		}
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
	forma_livre:function(coord){
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
	panel.write("Clique em <span class='destaque'>3</span> pontos para desenhar um <span class='destaque'>triângulo</span>.");
	obj = new Object();
	obj.type='triangle';
	obj.name='Triângulo';
	obj.waitClick=3;
	obj.done= SHAPE.triangle;
	obj.clickEventInit();

});
$('#forma_livre').on('click',function(){
	panel.write("Digite o número de pontos do polígono.");
		BUFFER.setEnterEvent(function(val){
		val = parseInt(val);
		panel.write("Clique em <span class='destaque'>"+val+"</span> pontos para desenhar um <span class='destaque'>polígono</span>.");
		obj = new Object();
		obj.type='forma_livre';
		obj.name='Polígono';
		obj.waitClick=val;
		obj.done= SHAPE.forma_livre;
		obj.clickEventInit();
	});
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



$('#translacao').on('click',function(){
	var transform = new transformation();
	transform.name='Translação';
	transform.type='translacao';
	transform.format='formato X,Y';
	transform.transoform_function=TRANSFORM.translate;
	transform.run();
});
$('#escala').on('click',function(){
	var transform = new transformation();
	transform.name='Mudança de escala';
	transform.type='scale';
	transform.format='formato X,Y';
	transform.transoform_function=TRANSFORM.scale;
	transform.run();
});

$('#rotacionar').on('click',function(){
	panel.clear();
	resetCanvas();
	var ids = TABLE.getSelecteds();
	if(ids.length==0){ 
		panel.write("Você precisa selecionar ao menos um elemento para realizar a transformação");
		return false;
	}
	
	panel.write("Digite o valor da transformação de Rotação no <span class='destaque'>formato X</span>, e em seguida pressione Enter");
	BUFFER.setEnterEvent(function(val){
		var actives = OBJECT_LIST.getActives(ids);
		TRANSFORM.rotate(actives,val);
		OBJECT_LIST.render();
		BUFFER.clearEnterEvent();

	});
});
$('#zoom').on('click',function(){
	if(ZOOM===false){
	}else{
	}
	ZOOM = !ZOOM;

	panel.clear();
	resetCanvas();
	var ids = TABLE.getSelecteds();
	if(ids.length==0){ 
		panel.write("Você precisa selecionar um elemento para realizar a função zoom. Será realizado zoom apenas <span class='destaque'>no primeiro</span> elemento selecionado.");
		return false;
	}
	var active_obj = OBJECT_LIST.getActives(ids)[0];
	//BACKUP_OBJSlIST =OBJECT_LIST.assign({}, OBJECT_LIST);
	BACKUP_OBJSlIST = JSON.parse(JSON.stringify(OBJECT_LIST));

	var $canvasWidth = $canvas.width();
	var $canvasHeight = $canvas.height();
	
	var middle;
	switch(active_obj.type){
			case "triangle":
			case "line":
			case "rectangle":
			case "forma_livre":
				middle = getMiddleCoords(active_obj.coord);
			break;
			case "circle":
				middle = active_obj.coord[0];
			break;
	}	
	var canvasMiddle = new Coord(parseInt(($canvasWidth/2)-middle.x),-parseInt(($canvasHeight/2)-middle.y));
	TRANSFORM.translate(OBJECT_LIST,canvasMiddle);


	var menorX = Number.MAX_SAFE_INTEGER;
	var menorY = Number.MAX_SAFE_INTEGER;
	active_obj.coord.forEach(function(el){
		if(($canvasWidth - el.x)<menorX){
			menorX = el;
		}
		if(($canvasHeight - el.y)<menorY){
			menorY = el;
		}
	});
	var skewRatio;

	log(menorX);
	log(menorY);

	if($canvasWidth/menorX.x > $canvasHeight/menorY.y){
		skewRatio = ($canvasWidth-menorX.x)/menorX.x;
	}else{
		skewRatio =($canvasHeight-menorY.y)/menorY.y;
	}
	//caderno
	log(skewRatio);
	TRANSFORM.scale(OBJECT_LIST,new Coord(skewRatio,skewRatio));

	OBJECT_LIST.render();

	setTimeout(function(){
		OBJECT_LIST = JSON.parse(JSON.stringify(BACKUP_OBJSlIST));
		//TRANSFORM.translate(OBJECT_LIST,canvasMiddle);
		OBJECT_LIST.render();
	},200000);
});

/*GROMETRIC TRANSFORM*/