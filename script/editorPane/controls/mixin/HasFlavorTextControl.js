function HasFlavorTextControl(){
  this.flavorTextControl = this.node.find('textarea[name="flavorText"]');

  this.flavorTextControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setFlavorText($(this).val());
  },null,this));

  this.setFlavorText=function(flavorText){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setFlavorText(flavorText);
  };
}
