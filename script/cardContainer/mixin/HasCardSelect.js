function HasCardSelect(){
  /**
   *
   */
    this.node.on('click','.card',$.proxy(function(coreNode,event){
      var card = $(this).closest('.cardGroup').data('node');

      coreNode.selectCard(card);
    },null,this));


  /**
   *
   */
    this.selectCard=function(sCard){
      //deselect cards
      //deselect existing cards
      var cards = $('.cardGroup');
      for(var i=0,card;(card=cards[i]);i++){
        if($(card).hasClass('selected')){
          $(card).removeClass('selected');
        }
      }

      sCard.node.addClass('selected');
    };
}
