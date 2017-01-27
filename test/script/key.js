$(document).ready(function(){
//console.log('key ready');

$('.addTest').click(function(event){
event.preventDefault();
console.log('add test button clicked');

	store.setCustomKey({
		'name':'test',
		'description':'this is a custom key',
		'version':'1.0',
		'selectedVersion':'1.0',
		'displayBack':true, 'hasErrata':true,
		'errata':[{'version':'1.1','description':'this is my test errata'}]
	});
});

});
