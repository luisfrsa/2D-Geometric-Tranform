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