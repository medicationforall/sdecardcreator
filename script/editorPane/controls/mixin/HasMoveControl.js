function HasMoveControl(){
  this.MoveControl = this.node.find('input[name="move"]');


/**
 *
 */
  this.MoveControl.on('input',$.proxy(function(coreNode,event){
    console.log('change Move',$(this).val());
    coreNode.setCardMove($(this).val());
  },null,this));


/**
 *
 */
  this.setCardMove=function(move){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setMove(move);
  };
}
