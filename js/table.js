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