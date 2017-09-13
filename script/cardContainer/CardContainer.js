function CardContainer(){
  console.log('create Card Container');
  this.node =undefined;


  /**
   *
   */
  this._construct=function(){
    this.node = $('.cardContainer');
    this.node.data('node',this);

    HasCardSelect.call(this);
  };

  /**
   * Collect the json data for all of the child cards.
   */
  this.gatherData=function(){
    console.log('call gather data for the cardContainer');
    var data = {};
    data.cards=[];
    var cards = this.node.find('.cardGroup');

    for(var i=0,card;(card=cards[i]);i++){
      var cardNode = $(card).data('node');
      data.cards.push(cardNode.gatherData());
    }

    return data;
  };


  /**
   * @todo will need a flag to indicate if already existing cards should be cleared.
   */
  this.loadData=function(data){
    console.log('card container load data');
  };

  this._construct();
}
