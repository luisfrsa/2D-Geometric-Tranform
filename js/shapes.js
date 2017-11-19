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