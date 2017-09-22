/**
 *   SDE Card Creator source file HasCardTypeControls,
 *   Copyright (C) 2017  James M Adams
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
 * Card Type mixin.
 * @mixin
 */
function HasCardTypeControls(){


  /**
   * Set Card Type.
   * @param {string} type
   */
  this.setCardType=function(type){
    console.log('card set type',type);
    this.data.cardType=type;
    this.setDisplay(this.node.find('.card'),type);
    this.setType(type);

    if(this.data.imageSource === undefined || this.data.imageSource === 'default'){
      this.setDefaultAvatar(type);
    }
  };


  /**
   *Sets the card type.
   *@param {string} type Has to be a valid card type.
   *@todo the types can be built from a util or mixin.
   *@todo verify that type is valid
   */
  this.setType=function(type){
    //console.log('set card type',type);
    this.node.find('.card').removeClass('hero monster pet treasure loot wonder explore arcade command timeout').addClass(type).css('display','');
  };


  /**
   *Sets the card scale for the card where 1 is 100%.
   *@param {float} scale
   */
  this.setScale=function(scale){
    this.data.scale=scale;
    var cards = this.node.find('.card');
    cards.css({'transform':'scale('+scale+','+scale+')','transform-origin':'top left'});
    this.node.find('.cardDiv').css({'width':(cards.width()*parseFloat(scale)), 'height':(cards.height()*parseFloat(scale))});
    this.node.css({'width':((cards.width()*parseFloat(scale))*2)+40, 'height':(cards.height()*parseFloat(scale))+20});
  };


  /**
   * Set Region
   * @param {string} region
   */
  this.setRegion=function(region){
    this.data.region=region;
    var cards = this.node.find('.card');
    cards.removeClass('red green purple yellow').addClass(region);
  };


  /**
   *Sets the card orientation specifically used for loot and treasure cards.
   *@param {string} orientation affinity ruby, saphire, emerald, citrine
   *@todo should lowercase value and throw exception if not a valid value.
   */
  this.setOrientation=function(orientation){
    this.data.orientation=orientation;
    var card = this.node;

    //sort out the appropriate class name for the divs
    card.find('.card .item .contentBorder, .card .item .placeHolder').removeClass('ruby sapphire citrine emerald').addClass(orientation);

    //re-order the divs if necessary
    if(orientation === 'ruby' || orientation === 'citrine'){
      card.find('.card .item .placeHolder').before(card.find('.card .item .contentBorder'));
    }else if(orientation === 'sapphire' || orientation === 'emerald'){
      card.find('.card .item .contentBorder').before(card.find('.card .item .placeHolder'));
    }
  };


  /**
   *
   */
  this.loadCardType=function(data){
    if(data.cardType !== undefined){
      this.setCardType(data.cardType);
    }

    if(data.scale !== undefined){
      this.setScale(data.scale);
    }

    if(data.region !== undefined){
      this.setRegion(data.region);
    }

    if(data.orientation !== undefined){
      this.setOrientation(data.orientation);
    }
  };
}
