var panel = {
	write:function(s,author){
		var who="<span class='system_console'>Console</span>: ";
		if(typeof(author)!=='undefined' && author=='user'){
			who = "<span class='user_console'>User</span>: ";
		}
		$ul =$('#panel').find('ul'); 
		$ul.append('<li>'+who+s+'</li>');
		panel.scroll();
	},
	clear:function(){
		$('#panel').find('ul').append('<li class="clear_line"></li>');
		panel.scroll();

	},
	clearAll:function(){
		$('#panel').find('ul').html('');

	},
	scroll:function(){
		$ul =$('#panel').find('ul'); 
		$('#panel').scrollTop($ul.height());

	}
}