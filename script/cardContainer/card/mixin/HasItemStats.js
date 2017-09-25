function HasItemStats(){

  /**
   * Set ItemStats.
   * @param {string} skulls
   */
  this.setItemStats=function(itemStats){
    this.data.itemStats = itemStats;

    var keywordStore = $('.page').data('keywordStore');

    //set parsed text
    var tItemStats = keywordStore.findKeywords(itemStats);
    tItemStats = keywordStore.findDice(tItemStats);
    tItemStats = keywordStore.findAffinity(tItemStats);
    tItemStats = keywordStore.findStats(tItemStats);

    this.node.find('.itemStats').html(tItemStats);

    //place keywords on back of card.
    keywordStore.checkKeywords(this.node.find('.front'));
  };


  /**
   * Load card information stat information from card data.
   * @param {object} data - Card Data.
   */
  this.loadCardItemStats=function(data){
    if(data.itemStats !== undefined){
      this.setItemStats(data.itemStats);
    }
  };
}
