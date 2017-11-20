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
	var getMiddleZoomIn = function(active_obj){
		var middle;
		switch(active_obj.type){
			case "circle":
				middle = active_obj.coord[0];
			break;
			case "triangle":
			case "line":
			case "rectangle":
			case "forma_livre":
			default:
				middle = getMiddleZoom(active_obj.coord);
			break;
		}	
		return middle;
	}
	var zoom = function(id){
		if(ZOOM===false){	

			BACKUP_OBJSlIST = JSON.parse(JSON.stringify(OBJECT_LIST));//BACKUP_OBJSlIST =OBJECT_LIST.assign({}, OBJECT_LIST);

			var $canvasWidth = $canvas.width();
			var $canvasHeight = $canvas.height();
			
			var active_obj = OBJECT_LIST.getActives(id)[0];
			var middle = getMiddleZoomIn(active_obj);

			var menorX = Number.MAX_SAFE_INTEGER;
			var menorY = Number.MAX_SAFE_INTEGER;
			var menorElX;
			var menorElY;
			var skewRatio;

			active_obj.coord.forEach(function(el){
				if(($canvasWidth - el.x) < menorX){
					menorX = $canvasWidth - el.x;
					menorElX = el.x;
				}
				if(($canvasHeight - el.y) < menorY){
					menorY = $canvasHeight - el.y;
					menorElY = el.y;
				}
			});
			
			var diffX = Math.abs(menorElX-middle.x);
			var diffY = Math.abs(middle.y-menorElY);

			var razaoW = ($canvasWidth/2)/diffX;
			var razaoH = ($canvasHeight/2)/diffY;

			if(razaoW < razaoH){
				skewRatio = razaoW;
			}else{
				skewRatio = razaoH; 
			}
			/*
			logs
			log('menores');	log(menorElX);	log(menorElY);	log('middle');	log(middle);	/*	log(menorElX.x);	log(middle.x);	log(menorElY.y);	log(middle.y);	log('diffs');	log(diffX);	log(diffY);	log('razao W a');	log(razaoW);	log('razao H b');	log (razaoH);		log('skewRatio');	log(skewRatio);	log(skewRatio);
			*/
			skewRatio = skewRatio*0.98;
	
			TRANSFORM.scale(OBJECT_LIST,new Coord(skewRatio,skewRatio));
			log("midles");
			log(middle);

			
			middle = TRANSFORM.getMiddleZoomIn(active_obj);

			log(middle);

			var canvasMiddle = new Coord(parseInt(($canvasWidth/2)-middle.x),-parseInt(($canvasHeight/2)-middle.y));
			TRANSFORM.translate(OBJECT_LIST,canvasMiddle);
			OBJECT_LIST.render();
		}else{
			OBJECT_LIST = JSON.parse(JSON.stringify(BACKUP_OBJSlIST));
			OBJECT_LIST.render();
		}
		ZOOM = !ZOOM;
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
		zoom:zoom,
		getMiddleZoomIn:getMiddleZoomIn,
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
		panel.write("Digite o valor da transformação de "+self.name+" no <span class='destaque'>"+self.format+"</span>, e em seguida pressione Enter");
		BUFFER.setEnterEvent(function(val){
			var value = TRANSFORM.getInputXY(val);
			var actives = OBJECT_LIST.getActives(ids);
			self.transoform_function(actives,value);
			OBJECT_LIST.render();
			BUFFER.clearEnterEvent();
			panel.write("Operação realizada com sucesso.");

		});
	}
}