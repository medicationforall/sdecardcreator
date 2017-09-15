function HasStats(){
  this.strStat = new Stat("STR", 'hero monster pet', '3b 1sw');
  this.armStat = new Stat("ARM", 'hero monster pet', '2b 1r sh');
  this.willStat = new Stat("WILL", 'hero monster', '3b');
  this.dexStat = new Stat("DEX", 'hero monster', '3b');

  /**
   *
   */
  this.setStat=function(stat,value){
    var statObject = this[stat+"Stat"];
    this.data[stat]=value;
    statObject.setValue(value);
  };


  /**
   *
   */
  this.setWounds=function(wounds){
    this.data.wounds = wounds;
    this.node.find('.wounds').text(wounds);
  };


  /**
   *
   */
  this.setPotions=function(potions){
    this.data.potions = potions;
    this.node.find('.potions').text(potions);
  };


  /**
   *
   */
  this.setSkulls=function(skulls){
    this.data.skulls = skulls;
    this.node.find('.skulls').text(skulls);
  };
}
