
$(document).ready(function(){
	
	if(document.cookie === ''){
		document.cookie = setCookie(guid());
	}
	
	$cbs = $('input:checkbox');

	$cbs.each(function(){
		$(this).on('change', function(){
	  	console.log($(this).parent().data('index'));
	  	console.log($(this).prop('checked'));

	  	registerCheckboxChange({"index": $(this).parent().data('index'), "isChecked": $(this).prop('checked'), "guid": getCookie() });

	  });
	});

});

function setCookie(value){
    document.cookie = "guid=" + value;
}

function getCookie(){
	return (document.cookie).split(';')[0].split('=')[1];
}

function registerCheckboxChange(event){
	$.ajax({
		type: "POST",
		url: "http://" + window.location.host + "/check",
		data: event
	})
	.done(function(){})
	.fail(function(){})
	.always(function(){});
}

function guid(){
	var range = "abcdefghijklmnopqrstuvwxyz0123456789",i,e,guid="";
	for(i=0;i<20;i++){
		e = Math.random() * 35;
	  guid += range.substring(e,e+1);
	}
	return guid;
}