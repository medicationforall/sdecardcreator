/**
 *   SDE Card Creator source file Card,
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

/**
 *User defined card component.
 */
function Card(){
  this.defaultMap=undefined;
  this.bit=undefined;
  this.selected = true;

  /**
   *Setup lifecycle.
   */
  this.setup=function(template){
    this.node=$(Card.template).appendTo('.pageContent');
    this.setupDefaultAvatar();
    this.setupDefaultBit();
  };


  /**
   *Register lifecycle
   */
  this.register=function(){
    //setup draggable
    this.node.find('.card .front .character').draggable({containment:'parent'});
  };


  /**
   * Creates the default avatar hashmap object.
   */
  this.setupDefaultAvatar=function(){
    var map ={};
    map.hero = 'image/barbsilo.png';
    map.monster = 'image/dragonsilo.png';
    map.pet = 'image/bunnysilo.png';
    map.loot = 'image/armor.png';
    map.treasure = 'image/weapon.png';
    map.wonder = 'image/wonder.png';
    map.explore = 'image/trap.png';
    map.timeout = 'image/gorosilo.png';
    map.command = 'image/koboldgoupsilo.png';
    this.defaultMap = map;
  };


  /**
   *
   */
  this.setupDefaultBit=function(){
    this.bit=[];
    this.bit.push('eight');
    this.bit.push('sixteen');
    this.bit.push('start');
    this.bit.push('special');
    this.bit.push('super');
  };


  /**
   *Sets the card scale for the card where 1 is 100%.
   *@param scale float
   */
  this.setScale=function(scale){
    var cards = this.node.find('.card');
    cards.css({'transform':'scale('+scale+','+scale+')','transform-origin':'top left'});
    this.node.css({'width':(cards.width()*parseFloat(scale)), 'height':(cards.height()*parseFloat(scale))});
  };


  /**
   *Sets the background image src attribute.
   *@param v string relative or absolute path
   */
  this.setBackground=function(v){
    this.node.find('.background').css({
    'background':'url('+v+') no-repeat',
    'background-size':'100% 100%'
    });
  };


  /**
   *Sets the flipped background flag
   *@param v boolean if true mirrors the background via css transform.
   *@todo should enforce boolean type for v
   */
  this.setFlipped=function(v){
    if(v){
      this.node.find('.background').css('transform','scaleX(-1)');
    }else{
      this.node.find('.background').css('transform','');
    }
  };


  /**
   *Sets the default avatar based on the defaultAvatar hashmap.
   *@param v string Card type
   *@todo should lowercase value and should throw exception if value is not in hashmap.
   */
  this.setDefaultAvatar=function(v){
    this.setAvatar(this.defaultMap[v]);
  };


  /**
   *Sets the avatar image src attribute.
   *@param v string absolute, relative path, or raw image data.
   */
  this.setAvatar=function(v){
    var character = this.node.find('.card .character');
    character.attr('src', v);
  };


  /**
   *Sets the card orientation specifically used for loot and treasure cards.
   *@param value string affinity ruby, saphire, emerald, citrine
   *@todo should lowercase value and throw exception is not a valid value.
   */
  this.setOrientation=function(value){
    var card = this.node;

    //console.log("Change orientation",$(this).val());

    //sort out the appropriate class name for the divs
    card.find('.card .item .contentBorder, .card .item .placeHolder').removeClass('ruby sapphire citrine emerald').addClass(value);

    //re-order the divs if necessary
    if(value === 'ruby' || value === 'citrine'){
      card.find('.card .item .placeHolder').before(card.find('.card .item .contentBorder'));
    }else if(value === 'sapphire' || value === 'emerald'){
      card.find('.card .item .contentBorder').before(card.find('.card .item .placeHolder'));
    }
  };


  /**
   *Sets the card type.
   *@param type string Has to be a valid card type.
   *@todo the types can be built from a util or mixin.
   *@todo verify that type is valid
   */
  this.setType=function(type){
    //console.log('set card type',type);
    this.node.find('.card').removeClass('hero monster pet treasure loot wonder explore arcade command timeout').addClass(type).css('display','');
  };


  /**
   *@todo yagni
   */
  this.setSelected=function(v){
    this.selected=v;
  };


  /**
   *@todo yagni
   */
  this.getSelected=function(){
    return this.selected;
  };


  /**
   *
   */
  this.setAffinity=function(v){
    this.node.find('.affinity').removeClass('ruby citrine emerald sapphire amethyst all');
    this.node.find('.affinity').addClass(v);
  };


  /**
   *
   */
  this.setBit=function(v){
    var bit = this.node.find('.bit');

    for(var i=0,option;(option=this.bit[i]);i++){
      bit.removeClass(option);
    }
    bit.addClass(v);
  };
}

Card.prototype = new CoreTemplate('html/card/Card.html');
Card.prototype.constructor = Card;
