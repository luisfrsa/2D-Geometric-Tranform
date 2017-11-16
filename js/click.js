$('#linha').on('click',function(){
	panel.write("Clique em 2 pontos para desenhar uma linha");
	obj = new Object();
	obj.type='line';
	obj.name='Linha';
	obj.waitClick=2;
	obj.done= function(){ 
		panel.clear();
		Draw.line(obj.coord);
		middle = getMiddle(obj.coord[0],obj.coord[1]);
		Draw.write(obj.name+" - "+obj.id,middle);
		OBJECT_LIST.add(obj);
	};
	obj.clickEventInit();

});

$('#retangulo').on('click',function(){
	panel.write("Clique em 2 pontos para desenhar um retângulo");
	obj = new Object();
	obj.type='rectangle';
	obj.name='Retângulo';
	obj.waitClick=2;
	obj.done= function(){ 
		panel.clear();
		Draw.rect(obj.coord);
		middle = getMiddle(obj.coord[0],obj.coord[1]);
		Draw.write(obj.name+" - "+obj.id,middle);
		OBJECT_LIST.add(obj);
	};
	obj.clickEventInit();

});

$('#circunferencia').on('click',function(){
	panel.write("Clique em 2 pontos para desenhar uma circunfêrencia");
	obj = new Object();
	obj.type='circle';
	obj.name='Círculo';
	obj.waitClick=2;
	obj.done= function(){ 
		panel.clear();
		Draw.circle(obj.coord);
		Draw.write(obj.name+" - "+obj.id,obj.coord[0]);
		OBJECT_LIST.add(obj);
	};
	obj.clickEventInit();

});
$('#triangulo').on('click',function(){
	panel.write("Clique em 3 pontos para desenhar uma triângulo");
	obj = new Object();
	obj.type='triangle';
	obj.name='Triângulo';
	obj.waitClick=3;
	obj.done= function(){ 
		panel.clear();
		Draw.triangle(obj.coord);
		middle = getMiddleTriangle(obj.coord);
		Draw.write(obj.name+" - "+obj.id,middle);
		OBJECT_LIST.add(obj);
	};
	obj.clickEventInit();

});
$('#clear').on('click',function(){
	resetCanvas();
	panel.clear();
	OBJECT_LIST = [];
	TABLE.clear();
	ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
});