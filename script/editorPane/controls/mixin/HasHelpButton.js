function HasHelpButton(){
  this.helpButton = this.node.find('.helpButton');

  this.helpButton.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();

    coreNode.toggleHelp();
  },null,this));

  this.toggleHelp=function(){
    this.node.find('.helpBlock').toggle();
  };
}
