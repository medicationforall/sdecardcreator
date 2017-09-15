function HasAffinity(){
  /**
   *
   */
  this.setAffinity=function(affinity){
    this.data.affinity = affinity;
    this.node.find('.affinity').removeClass('ruby citrine emerald sapphire amethyst all');
    this.node.find('.affinity').addClass(affinity);
  };
}
