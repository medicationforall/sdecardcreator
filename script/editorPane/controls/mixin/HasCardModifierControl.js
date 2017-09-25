function HasCardModifierControl(){
  this.cardModifierButtons = this.node.find('.cardModifier');


  /**
   * Card Modifier click.
   */
  this.cardModifierButtons.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();
    var action = $(this).data('action');
    coreNode.modifyCard(action);
  },null,this));


  /**
   * Modify card action.
   */
  this.modifyCard=function(action){
    console.log('modify card',action);
    var cardContainer = $('.cardContainer').data('node');

    if(action==='delete'){
      cardContainer.deleteSelectedCard();
    }else if(action==='duplicate'){
      cardContainer.duplicateSelectedCard();
    }else if(action==='up'){
      cardContainer.moveSelectedCardUp();
    }else if(action==='down'){
      cardContainer.moveSelectedCardDown();
    }
  };
}
