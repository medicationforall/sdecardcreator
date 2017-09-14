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
 *
 */
function Ability(){
  this.formNode=undefined;
  this.cardNode=undefined;
  this.data={};

  //CONSTRUCTOR
  this._constructor=function(){
    Ability.counter++;
  };


  //methods
  /**
   *
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

  this.getFormNode=function(){
    if(this.formNode===undefined){
      this.formNode = $(this.getFormTemplate());
      this.formNode.data('node',this);

      this._setupFormNode();
    }
    return this.formNode;
  };

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

  this.closeAbility=function(){
    console.log('closeAbility');
    var cardNode = $('.cardGroup.selected').data('node');
    var keywordStore = $('.page').data('keywordStore');
    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"]').remove();
    this.formNode.remove();
    keywordStore.checkKeywords(cardNode.node.find('.front'));
  };

  this.setName=function(name){
    this.data.name=name;
    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"] .name').text(name);
  };

  this.setCostType=function(costType){
    var cardNode = $('.cardGroup.selected');
    this.data.costType=costType;
    //reset
    cardNode.find('.name, .colon, .definition').css('display','');
    this.formNode.find('input[name="name"],input[name="cost"], textarea[name="definition"]').parent().css('display','');
    cardNode.find('.cost').removeClass('attack support emergencyPotion supportPotion offensePotion special definitionOnly nameOnly');

    cardNode.find('.cost').addClass(costType);

    //card ability display
    if(costType==='definitionOnly'){
      cardNode.find('.name, .colon').css('display','none');
    }else if(costType==='nameOnly'){
      cardNode.find('.colon, .definition').css('display','none');
    }

    //for ability display
    if(costType==='special'){
      this.formNode.find('input[name="cost"]').parent().css('display','none');
    } else if(costType==='definitionOnly'){
      this.formNode.find('input[name="name"],input[name="cost"]').parent().css('display','none');
    } else if(costType==='nameOnly'){
      this.formNode.find('input[name="cost"],textarea[name="definition"]').parent().css('display','none');
    }
  };

  this.setCost=function(cost){
    this.data.cost=cost;
    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"] .cost').html(this.parseAbilityCost(cost));
  };

  this.setDefinition=function(definition){
    var cardNode = $('.cardGroup.selected').data('node');
    var keywordStore = $('.page').data('keywordStore');
    this.data.definition=definition;
    $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"] .definition').html(this.parseAbility(definition));
    keywordStore.checkKeywords(cardNode.node.find('.front'));
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
  this.parseAbility=function(text){
    var keywordStore = $('.page').data('keywordStore');
    var kText = keywordStore.findKeywords(text);
    var dText = keywordStore.findDice(kText);

    return keywordStore.findStats(dText);
  };


  /**
   *
   */
  this.getCardTemplate=function(){
    var template = '<div data-ability="'+Ability.counter+'" class="ability">'+
    '<div class="cost attack">1</div>'+'<span class="name">Ability '+Ability.counter+'</span>'+'<span class="colon">:</span>'+'<span class="definition"></span>'+
    '</div>';

    return template;
  };

  this.getCardNode=function(node){
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
