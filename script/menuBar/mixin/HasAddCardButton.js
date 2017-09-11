function HasAddCardButton(){
  this.addCardbutton = this.node.find('.addCard');


/**
 *
 */
  this.addCardbutton.click($.proxy(function(event){
    event.preventDefault();
    this.addCard();
  },this));


/**
 *
 */
  this.addCard=function(){
    console.log('add card');

    //deselect existing cards
    var cards = $('.cardGroup');
    for(var i=0,card;(card=cards[i]);i++){
      if($(card).hasClass('selected')){
        $(card).removeClass('selected');
      }
    }

    new Card();
  };
}
