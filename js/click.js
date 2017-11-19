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