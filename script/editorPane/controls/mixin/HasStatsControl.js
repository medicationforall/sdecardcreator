function HasStatsControl(){
  this.strControl = this.node.find('input[name="STR"]');
  this.armControl = this.node.find('input[name="ARM"]');
  this.willControl = this.node.find('input[name="WILL"]');
  this.dexControl = this.node.find('input[name="DEX"]');

  this.woundsControl = this.node.find('input[name="wounds"]');
  this.skullsControl = this.node.find('input[name="skulls"]');
  this.potionsControl = this.node.find('input[name="potions"]');


  /**
   *
   */
  this.strControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('str',$(this).val());
  },null,this));


  /**
   *
   */
  this.armControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('arm',$(this).val());
  },null,this));


  /**
   *
   */
  this.willControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('will',$(this).val());
  },null,this));


  /**
   *
   */
  this.dexControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('dex',$(this).val());
  },null,this));


  /**
   *
   */
  this.woundsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setWounds($(this).val());
  },null,this));


  /**
   *
   */
  this.potionsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setPotions($(this).val());
  },null,this));


  /**
   *
   */
  this.skullsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setSkulls($(this).val());
  },null,this));


  /**
   *
   */
  this.setStat=function(stat,value){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setStat(stat,value);
  };


  /**
   *
   */
  this.setWounds=function(wounds){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setWounds(wounds);
  };


  /**
   *
   */
  this.setPotions=function(potions){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setPotions(potions);
  };


  /**
   *
   */
  this.setSkulls=function(skulls){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setSkulls(skulls);
  };
}
