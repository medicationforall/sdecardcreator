function HasOrientationControl(){
  this.orientationControl = this.node.find('select[name="orientation"]');

  this.orientationControl.on('change',$.proxy(function(coreNode,event){
    console.log('change orientation',$(this).val());
    coreNode.setOrientation($(this).val());
  },null,this));

  this.setOrientation=function(orientation){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setOrientation(orientation);
  };
}
