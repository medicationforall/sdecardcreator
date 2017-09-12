function HasBackgroundControl(){
  this.backgroundControl = this.node.find('select[name="background"]');
  this.backroundFlipControl = this.node.find('input[name="backgroundFlip"]');

  /**
   *
   */
  this.backgroundControl.on('change',$.proxy(function(coreNode,event){
    console.log('change background',$(this).val());
    coreNode.setBackground('image/background/'+$(this).val());
  },null,this));


  /**
   *
   */
  this.backroundFlipControl.on('change',$.proxy(function(coreNode,event){
    console.log('background flip',$(this).is(':checked'));
    coreNode.setBackgroundFlip($(this).is(':checked'));
  },null,this));


  /**
   *
   */
  this.setBackground=function(background){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setBackground(background);
  };


  /**
   *
   */
  this.setBackgroundFlip=function(backgroundFlip){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setBackgroundFlip(backgroundFlip);
  };
}
