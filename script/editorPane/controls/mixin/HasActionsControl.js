function HasActionsControl(){
  this.ActionsControl = this.node.find('input[name="actions"]');


/**
 *
 */
  this.ActionsControl.on('input',$.proxy(function(coreNode,event){
    console.log('change Actions',$(this).val());
    coreNode.setCardActions($(this).val());
  },null,this));


/**
 *
 */
  this.setCardActions=function(actions){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setActions(actions);
  };
}
