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
	ctx.clearRect(0, 0, $canvas.width()+10, $canvas.height()+10);
}
$('#clear').on('click',function(){
	resetCanvas();
	OBJECT_LIST = [];
	blank_canvas();
	panel.write("Canvas limpa com sucesso.");

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
		panel.write("Operação realizada com sucesso.");
	});
});
$('#zoom').on('click',function(){
	
	panel.clear();
	resetCanvas();
	var id = TABLE.getSelecteds();
	if(id.length==0 && ZOOM===false){ 
		panel.write("Você precisa selecionar um elemento para realizar a função zoom. Será realizado zoom apenas <span class='destaque'>no primeiro</span> elemento selecionado.");
		return false;
	}
	TRANSFORM.zoom(id);
	panel.write("Operação realizada com sucesso.");
	
});
//$('#zoom2').on('click',function(){	if(ZOOM===false){	}else{	}	ZOOM = !ZOOM;	panel.clear();	resetCanvas();	var ids = TABLE.getSelecteds();	if(ids.length==0){ 		panel.write("Você precisa selecionar um elemento para realizar a função zoom. Será realizado zoom apenas <span class='destaque'>no primeiro</span> elemento selecionado.");		return false;	}	/*BACKUP_OBJSlIST =OBJECT_LIST.assign({}, OBJECT_LIST);*/	BACKUP_OBJSlIST = JSON.parse(JSON.stringify(OBJECT_LIST));	var $canvasWidth = $canvas.width();	var $canvasHeight = $canvas.height();		var active_obj = OBJECT_LIST.getActives(ids)[0];	var middle = TRANSFORM.getMiddleZoomIn(active_obj);	var menorX = Number.MAX_SAFE_INTEGER;	var menorY = Number.MAX_SAFE_INTEGER;	var menorElX,menorElY;	active_obj.coord.forEach(function(el){		if(($canvasWidth - el.x) < menorX){			menorX = $canvasWidth - el.x;			menorElX = el.x;		}		if(($canvasHeight - el.y) < menorY){			menorY = $canvasHeight - el.y;			menorElY = el.y;		}	});		var skewRatio;	var diffX = Math.abs(menorElX-middle.x);	var diffY = Math.abs(middle.y-menorElY);		var razaoW = ($canvasWidth/2)/diffX;	var razaoH = ($canvasHeight/2)/diffY;	if(razaoW < razaoH){		skewRatio = razaoW;	}else{		skewRatio = razaoH;	}		skewRatio = skewRatio*0.98;		TRANSFORM.scale(OBJECT_LIST,new Coord(skewRatio,skewRatio));	log("midles");	log(middle);		middle = TRANSFORM.getMiddleZoomIn(active_obj);	log(middle);	var canvasMiddle = new Coord(parseInt(($canvasWidth/2)-middle.x),-parseInt(($canvasHeight/2)-middle.y));	TRANSFORM.translate(OBJECT_LIST,canvasMiddle);	OBJECT_LIST.render();	setTimeout(function(){		OBJECT_LIST = JSON.parse(JSON.stringify(BACKUP_OBJSlIST));		OBJECT_LIST.render();	},200000);});

/*GROMETRIC TRANSFORM*/