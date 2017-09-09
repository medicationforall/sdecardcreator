function HasToggleDisplay(){

  this.node.on('click','.toggleDisplay',$.proxy(function(event){
    event.preventDefault();
    this.toggleDisplay();
  },this));

  this.toggleDisplay=function(){
    var content = this.node.find('.controlContent');

    if(content.hasClass('hide')){
      content.removeClass('hide').animateCss('flipInX');
    }else{
      content.addClass('hide');
    }
  };
}
