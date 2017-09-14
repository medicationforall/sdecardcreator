function HasAddAbilityControl(){
  this.addAbilityControl = this.node.find('.addAbility');

  /**
   *
   */
  this.addAbilityControl.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();
    coreNode.addAbility();
  },null,this));

  /**
   *
   */
  this.addAbility=function(){
    console.log('add ability');
    var cardNode = $('.cardGroup.selected').data('node');

    var ability = new Ability();
    var formAbility = ability.getFormNode(this.node.find('.abilities')).appendTo(this.node.find('.abilities'));
    cardNode.addAbility(ability);
  };
}
