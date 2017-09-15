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
  HasAbilityCardNode.call(this);
  HasAbilityFormNode.call(this);
  this.data={};

  this._constructor=function(){
    Ability.counter++;
  };


  /**
   * Close/Delete an ability.
   */
  this.closeAbility=function(){
    console.log('closeAbility');
    this.getCardAbilitynodes.remove();
    this.formNode.remove();
    this._checkKeywords();
  };


  /**
   * Set Name.
   * @param {string} name - Ability Name.
   */
  this.setName=function(name){
    this.data.name=name;
    this.getCardAbilitynodes.find('.name').text(name);
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
    this.getCardAbilitynodes.find('.cost').html(this.parseAbilityCost(cost));
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

    this.data.definition=definition;
    this.getCardAbilitynodes.find('.definition').html(this.parseAbility(definition));

    this._checkKeywords();
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
   * Force a keyword update on the selected card.
   */
  this._checkKeywords=function(){
    var cardNode = $('.cardGroup.selected').data('node');
    var keywordStore = $('.page').data('keywordStore');
    keywordStore.checkKeywords(cardNode.node.find('.front'));
  };


  /**
   * Collect the json data representation of the object.
   * @return {object} data
   */
  this.gatherData=function(){
    return this.data;
  };


  //main
  this._constructor();
}

//static data
Ability.counter = 0;
