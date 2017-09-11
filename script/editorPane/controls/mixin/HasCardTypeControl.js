function HasCardTypeControl(){
  this.cardTypeControl = this.node.find('select[name="cardType"]');

/**
 *
 */
  this.cardTypeControl.on('change',$.proxy(function(coreNode,event){
    console.log('change card type',$(this).val());
    coreNode.setCardType($(this).val());
  },null,this));

/**
 *
 */
  this.setCardType=function(type){
    var cardNode = $('.cardGroup.selected').data('node');
    this.parent.setDisplay(this.parent.node,type);
    cardNode.setCardType(type);
  };
}
