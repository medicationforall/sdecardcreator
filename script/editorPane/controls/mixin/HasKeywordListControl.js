function HasKeywordListControl(){
  this.keywordList = this.node.find('input[name="keywordsList"]');

  this.keywordList.on('change',$.proxy(function(coreNode,event){
    coreNode.setKeywords($(this).val());
  },null,this));

  this.setKeywords=function(keywords){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setKeywords(keywords);
  };
}
