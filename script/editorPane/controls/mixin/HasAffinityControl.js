function HasAffinityControl(){
  this.affinityControl = this.node.find('select[name="affinity"]');


  /**
   *
   */
  this.affinityControl.on('change',$.proxy(function(coreNode,event){
    coreNode.setAffinity($(this).val());
  },null,this));


  /**
   *
   */
  this.setAffinity=function(affinity){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setAffinity(affinity);
  };
}
