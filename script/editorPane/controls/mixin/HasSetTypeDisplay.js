function HasSetTypeDisplay(){

  this.setDisplay=function(node,type){
    node.find('.hero, .monster, .pet, .treasure, .loot, .wonder, .explore, .arcade, .command, .timeout').css('display','none');
    node.find('.'+type).css('display','');
  };

}
