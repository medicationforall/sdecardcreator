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
   * Set card type.
   * @param {string} type
   */
  this.setCardType=function(type){
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
   *@todo verify that type is valid.
   */
  this.setType=function(type){
    this.node.find('.card').removeClass('hero monster pet treasure loot wonder explore arcadeSolo arcadeGang command timeout').addClass(type).css('display','');
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
   * Set the cards author.
   * @param {string} author - Card author.
   */
  this.setAuthor=function(author){
    this.data.author=author;
    this.node.find('.author').text(author);
  };


  /**
   * Set region.
   * @param {string} region - valid values: red, green, purple, yellow.
   */
  this.setRegion=function(region){
    this.data.region=region;
    var cards = this.node.find('.card');
    cards.removeClass('blue red green purple yellow orange pink brown white black gray').addClass(region);
  };


  /**
   *Sets the card orientation specifically used for loot and treasure cards.
   *@param {string} orientation - valid values: ruby, saphire, emerald, citrine
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
   * Load card type information from card data.
   * @param {object} data - Card Data.
   */
  this.loadCardType=function(data){
    if(data.cardType !== undefined){
      this.setCardType(data.cardType);
    }

    if(data.scale !== undefined){
      this.setScale(data.scale);
    }

    if(data.author !== undefined){
      this.setAuthor(data.author);
    }

    if(data.region !== undefined){
      this.setRegion(data.region);
    }

    if(data.orientation !== undefined){
      this.setOrientation(data.orientation);
    }
  };
}
