var Buffer = function(){
	var val = '';

	var clear = function(){
		setVal('');
		clearEnterEvent();
	}
	var setVal = function(v){
		val = v;
	}
	var getVal = function(){
		return v;
	}

	var enterEvent = function(){};

	var setEnterEvent = function(fun){
		enterEvent = fun||function(){}; 
	};
	var getEnterEvent = function(){
		return enterEvent;
	};
	var clearEnterEvent = function(){
		getEnterEvent(function(){});
	}
	return {
		clear:clear,
		setVal:setVal,
		getVal:getVal,
		setEnterEvent:setEnterEvent,
		getEnterEvent:getEnterEvent,
		clearEnterEvent:clearEnterEvent,
	}
}
