function HasKeywords(){

  /**
   *
   */
  this.setKeywords=function(keywords){
      keywords = $("<div>").text(keywords).html();
      
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
