function HasFlavorText(){


  /**
   * @param string flavorText
   */
  this.setFlavorText=function(flavorText){
    this.data.flavorText = flavorText;
    this.node.find('.flavorText').text(flavorText);
  };
}
