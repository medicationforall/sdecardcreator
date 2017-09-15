function HasAbilityFormNode(){
    this.formNode=undefined;

    /**
     * @return {string} HTML form template.
     */
    this.getFormTemplate=function(){
      var template = '<div data-ability="'+Ability.counter+'" class="ability">'+
      '<a href="" class="closeAbility" title="Close">X</a>'+
      '<div class="displayInline">Type <select name="costType">'+
      '<option value="attack">Attack</option>'+
      '<option value="support">Support</option>'+
      '<option value="offensePotion">Offense Potion</option>'+
      '<option value="supportPotion">Support Potion</option>'+
      '<option value="emergencyPotion">Emergency Potion</option>'+
      '<option value="special">Special</option>'+
      '<option disabled>──────────</option>'+
      '<option value="definitionOnly">Definition</option>'+
      '<option value="nameOnly">Name</option>'+
      '</select></div>'+
      '<div class="displayInline">Cost <input class="number" name="cost" type="number" value="1" min="0" max="99" /></div>'+
      '<div>Name <input name="name" value="Ability '+Ability.counter+'" /></div>'+
      '<div>Definition <textarea name="definition" ></textarea></div>'+
      '</div>';

      return template;
    };


    /**
     * Get Form Node.
     * @return {object} Form resolved to a jQuery selector.
     */
    this.getFormNode=function(){
      if(this.formNode===undefined){
        this.formNode = $(this.getFormTemplate());
        this.formNode.data('node',this);

        this._setupFormNode();
      }
      return this.formNode;
    };


    /**
     * Registers the form logic for the formNode.
     */
    this._setupFormNode=function(){
      this.formNode.find('.closeAbility').on('click',$.proxy(function(coreNode,event){
        event.preventDefault();
        coreNode.closeAbility();
      },null,this));

      this.formNode.find('select[name="costType"]').on('change',$.proxy(function(coreNode,event){
        coreNode.setCostType($(this).val());
      },null,this));

      this.formNode.find('input[name="cost"]').on('input',$.proxy(function(coreNode,event){
        coreNode.setCost($(this).val());
      },null,this));

      this.formNode.find('input[name="name"]').on('input',$.proxy(function(coreNode,event){
        coreNode.setName($(this).val());
      },null,this));

      this.formNode.find('textarea[name="definition"]').on('input',$.proxy(function(coreNode,event){
        coreNode.setDefinition($(this).val());
      },null,this));
    };

}
