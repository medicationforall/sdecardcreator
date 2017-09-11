function HasScaleControl(){
  this.scaleControl=this.node.find('input[name="cardScale"]');

  this.scaleControl.on('input',$.proxy(function(coreNode,event){
    console.log('change card scale',$(this).val());
    coreNode.setScale($(this).val());
  },null,this));

  this.setScale=function(scale){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setScale(scale);
  };
}
