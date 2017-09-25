function HasItemStatsControl(){
  this.itemStatsControl = this.node.find('input[name="itemStats"]');


  /**
   *
   */
  this.itemStatsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setItemStats($(this).val());
  },null,this));

  this.setItemStats=function(value){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setItemStats(value);
  };
}
