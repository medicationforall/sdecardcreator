/**
 *   SDE Card Creator source file Ability,
 *   Copyright (C) 2015  James M Adams
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

/**
 * Ability linked between the editForm and a Card.
 */
function Ability(){
  this.formNode=undefined;
  this.cardNode=undefined;
  this.data={};


  this._constructor=function(){
    Ability.counter++;
  };


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


  /**
   * Close/Delete an ability.
   */
  this.closeAbility=function(){
    console.log('closeAbility');
    var cardNode = $('.cardGroup.selected').data('node');
    var keywordStore = $('.page').data('keywordStore');

    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"]').remove();
    this.formNode.remove();

    keywordStore.checkKeywords(cardNode.node.find('.front'));
  };


  /**
   * Set Name.
   * @param {string} name - Ability Name.
   */
  this.setName=function(name){
    this.data.name=name;
    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"] .name').text(name);
  };


  /**
   * Set Cost Type
   * @param {string} costType - Ability Cost Type.
   */
  this.setCostType=function(costType){
    var cardNode = $('.cardGroup.selected');
    this.data.costType=costType;

    this._resetCostType(cardNode);
    cardNode.find('.cost').addClass(costType);
    this._cardAbilityDisplay(cardNode,costType);
    this._formAbilityDisplay(costType);
  };


  /**
   * Reset.
   * @param {object} cardNode - Selected card reference.
   */
  this._resetCostType=function(cardNode){
    cardNode.find('.name, .colon, .definition').css('display','');
    this.formNode.find('input[name="name"],input[name="cost"], textarea[name="definition"]').parent().css('display','');
    cardNode.find('.cost').removeClass('attack support emergencyPotion supportPotion offensePotion special definitionOnly nameOnly');
  };


  /**
   * Card ability display.
   * @param {object} cardNode - Selected card reference.
   * @param {string} costType - Ability Cost Type.
   */
  this._cardAbilityDisplay=function(cardNode,costType){
    if(costType==='definitionOnly'){
      cardNode.find('.name, .colon').css('display','none');
    }else if(costType==='nameOnly'){
      cardNode.find('.colon, .definition').css('display','none');
    }
  };


  /**
   * Form ability display.
   * @param {string} costType - Ability Cost Type.
   */
  this._formAbilityDisplay=function(costType){
    if(costType==='special'){
      this.formNode.find('input[name="cost"]').parent().css('display','none');
    } else if(costType==='definitionOnly'){
      this.formNode.find('input[name="name"],input[name="cost"]').parent().css('display','none');
    } else if(costType==='nameOnly'){
      this.formNode.find('input[name="cost"],textarea[name="definition"]').parent().css('display','none');
    }
  };


  /**
   * Set Cost.
   * @param {string} cost - Ability Cost in action points.
   */
  this.setCost=function(cost){
    cost = $("<div>").text(cost).html();
    this.data.cost=cost;
    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"] .cost').html(this.parseAbilityCost(cost));
  };


  /**
   * Parse Ability Cost, if it's zero return an empty space.
   * @return {string}
   */
  this.parseAbilityCost=function(cost){
    if(cost==="0"){
      cost = '&nbsp;';
    }
    return cost;
  };


  /**
   * Set Definition.
   * @param {string} definition - Ability definition.
   */
  this.setDefinition=function(definition){
    definition = $("<div>").text(definition).html();
    var cardNode = $('.cardGroup.selected').data('node');
    var keywordStore = $('.page').data('keywordStore');

    this.data.definition=definition;
    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"] .definition').html(this.parseAbility(definition));
    keywordStore.checkKeywords(cardNode.node.find('.front'));
  };


  /**
   * Parses a string for keywords, dice, affinity, and stats.
   * @param {string} text - string to be parsed.
   */
  this.parseAbility=function(text){
    var keywordStore = $('.page').data('keywordStore');
    var kText = keywordStore.findKeywords(text);
    var dText = keywordStore.findDice(kText);
    var aText = keywordStore.findAffinity(dText);
    var sText = keywordStore.findStats(aText);

    return sText;
  };


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


  //main
  this._constructor();
}

//static data
Ability.counter = 0;
