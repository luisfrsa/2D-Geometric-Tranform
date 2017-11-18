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