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
$('#poligono').on('click',function(){
	panel.write("Digite o número de pontos do polígono.");
		BUFFER.setEnterEvent(function(val){
		val = parseInt(val);
		panel.write("Clique em <span class='destaque'>"+val+"</span> pontos para desenhar um <span class='destaque'>polígono</span>.");
		obj = new Object();
		obj.type='poligono';
		obj.name='Polígono';
		obj.waitClick=val;
		obj.done= SHAPE.poligono;
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
	panel.clear();
	resetCanvas();
	var ids = TABLE.getSelecteds();
	if(ids.length==0){
		panel.write("Você precisa selecionar ao menos um elemento para realizar a transformação");
		return false;
	}
	
	panel.write("Digite o valor da transformação de XXXX no <span class='destaque'>formato X,Y</span>, e em seguida pressione Enter");
	BUFFER.setEnterEvent(function(val){
		var value = TRANSFORM.getInputXY(val);
		var actives = OBJECT_LIST.getActives(ids);
		TRANSFORM.translate(actives,value);
		OBJECT_LIST.render();

	});
});
$('#escala').on('click',function(){
	panel.clear();
	resetCanvas();
	var ids = TABLE.getSelecteds();
	if(ids.length==0){
		panel.write("Você precisa selecionar ao menos um elemento para realizar a transformação");
		return false;
	}
	
	panel.write("Digite o valor da transformação de XXXX no <span class='destaque'>formato X,Y</span>, e em seguida pressione Enter");
	BUFFER.setEnterEvent(function(val){
		var value = TRANSFORM.getInputXY(val);
		var actives = OBJECT_LIST.getActives(ids);
		TRANSFORM.scale(actives,value);
		OBJECT_LIST.render();

	});
});
$('#rotacionar').on('click',function(){
	panel.clear();
	resetCanvas();
	var ids = TABLE.getSelecteds();
	if(ids.length==0){ 
		panel.write("Você precisa selecionar ao menos um elemento para realizar a transformação");
		return false;
	}
	
	panel.write("Digite o valor da transformação de XXXX no <span class='destaque'>formato X</span>, e em seguida pressione Enter");
	BUFFER.setEnterEvent(function(val){
		var actives = OBJECT_LIST.getActives(ids);
		TRANSFORM.rotate(actives,val);
		OBJECT_LIST.render();

	});
});


/*GROMETRIC TRANSFORM*/