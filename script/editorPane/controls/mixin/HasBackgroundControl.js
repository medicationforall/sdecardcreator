function HasBackgroundControl(){
  this.backgroundControl = this.node.find('select[name="background"]');
  this.backroundFlipControl = this.node.find('.backgroundFlip');

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
  this.backroundFlipControl.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();
    if($(this).hasClass('inactive')){
      $(this).removeClass('inactive').addClass('active');
      coreNode.setBackgroundFlip(true);
    }else{
      $(this).removeClass('active').addClass('inactive');
      coreNode.setBackgroundFlip(false);
    }
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
