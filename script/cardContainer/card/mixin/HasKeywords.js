function HasKeywords(){

  /**
   *
   * @todo before adding to data and dom should parse out html.
   */
  this.setKeywords=function(keywords){
      console.log('set keywords for card',keywords);
      this.data.keywords=keywords;
      var keywordStore = $('.page').data('keywordStore');

      //set parsed text
      var kText = keywordStore.findKeywords(keywords);
      this.node.find('.keywordsList').html(kText);

      //place keywords on back of card.
      keywordStore.checkKeywords(this.node.find('.front'));
  };
}
