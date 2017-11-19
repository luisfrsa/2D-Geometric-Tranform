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
