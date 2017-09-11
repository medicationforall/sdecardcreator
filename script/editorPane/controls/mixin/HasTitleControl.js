function HasTitleControl(){
  this.titleControl = this.node.find('input[name="title"]');


/**
 *
 */
  this.titleControl.on('input',$.proxy(function(coreNode,event){
    console.log('change title',$(this).val());
    coreNode.setCardTitle($(this).val());
  },null,this));


/**
 *
 */
  this.setCardTitle=function(title){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setTitle(title);
  };
}
