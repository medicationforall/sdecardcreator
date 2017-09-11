function HasRegionControl(){
  this.regionControl = this.node.find('select[name="region"]');

  this.regionControl.on('change',$.proxy(function(coreNode,event){
    console.log('change region',$(this).val());
    coreNode.setRegion($(this).val());
  },null,this));

  this.setRegion=function(region){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setRegion(region);
  };
}
