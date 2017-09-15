function HasAbilityCardNode(){
    this.cardNode=undefined;

    /**
     * Get Card Template.
     * @return {string} Card HTML template.
     */
    this.getCardTemplate=function(){
      var template = '<div data-ability="'+Ability.counter+'" class="ability">'+
      '<div class="cost attack">1</div>'+'<span class="name">Ability '+Ability.counter+'</span>'+'<span class="colon">:</span>'+'<span class="definition"></span>'+
      '</div>';

      return template;
    };


    /**
     * Get Card node.
     * @return {object} Card resolved to a jQuery selector.
     */
    this.getCardNode=function(){
      if(this.cardNode===undefined){
        this.cardNode = $(this.getCardTemplate());
        this.cardNode.data('node',this);
      }
      return this.cardNode;
    };

    this.getCardAbilitynodes=function(){
      return $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"]');
    };
}
