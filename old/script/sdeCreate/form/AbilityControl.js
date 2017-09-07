/**
 *   SDE Card Creator source file AbilityCOntrol,
 *   Copyright (C) 2016  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function AbilityControl(){

  /**
   *
   */
  this.setup=function(){
    this.node = $(AbilityControl.template).appendTo(this.parent.node);
    this.setupAddAbility();
  };


  /**
   *
   */
  this.register=function(){
    this.setupSortable();
    this.setupCloseAbility();
  };


  /**
   *
   */
  this.setupSortable=function(){
    this.node.find('.abilities').sortable({containment: "parent", tolerance: "pointer", 'ui-floating': 'auto', axis:'y', placeholder: "ui-state-highlight",
    forceHelperSize: false, update:function(event,ui){
      this.handleAbilityUpdate();
    }.bind(this)});
  };


  /**
   *
   */
  this.setupAddAbility=function(){
    this.node.find('.addAbility').click(function(event){
      event.preventDefault();
      var ability = new Ability();
      this.setupAbility(ability);
    }.bind(this));
  };


  /**
   *
   */
  this.setupCloseAbility=function(){
    this.node.find('.abilities').on('click','.closeAbility',$.proxy(function(control,event){
      event.preventDefault();
      var form = control.closest(Form);
      var parent = $(this).parent();
      var ability = $(parent).data('ability');

      $('.card .ability[data-ability="'+ability+'"]').remove();
      $(parent).remove();

      form.checkKeywords();
    },undefined,this));
  };


  /**
   *
   */
  this.setupAbility=function(ability){
    var form = this.closest(Form);
    //create the nodes
    var cardNode = $(ability.getCardTemplate()).appendTo('.card .abilities');
    var formNode = $(ability.getFormTemplate()).appendTo('.form .abilities');

    form.linkAbilityType(formNode, cardNode);
    form.link($(formNode).find('input[name="cost"]'),$(cardNode).find('.cost'),this.parseAbilityCost);
    form.link($(formNode).find('input[name="name"]'),$(cardNode).find('.name'));
    form.link($(formNode).find('textarea[name="definition"]'),$(cardNode).find('.definition'),this.parseAbility,form.checkKeywords);

    return formNode;
  };


  /**
   *
   */
  this.parseAbility=function(text){
    var kText = this.findKeywords(text);
    var dText = this.findDice(kText);

    return this.findStats(dText);
  };


  /**
   *
   */
  this.parseAbilityCost=function(text){
    if(text==="0"){
      text = '&nbsp;';
    }
    return text;
  };

  /**
   *
   */
  this.handleAbilityUpdate=function(){
    var form = this.closest(Form);
    //loop through from abilities in order
    this.node.find('.ability').each(function(index,item){
      var abilityId = $(item).data('ability');

      //loop through card abilities change order for model and item
      $('.card .model .ability[data-ability="'+abilityId+'"]').detach().appendTo($('.card .model .abilities'));
      $('.card .item .ability[data-ability="'+abilityId+'"]').detach().appendTo($('.card .item .abilities'));
      $('.card .back .ability[data-ability="'+abilityId+'"]').detach().appendTo($('.card .back .abilities'));
    });

    form.checkKeywords();
  };
}

AbilityControl.prototype = new CoreTemplate('html/form/AbilityControl.html');
AbilityControl.prototype.constructor = AbilityControl;
