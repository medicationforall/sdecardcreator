/**
 *   SDE Card Creator source file HasCardTypeControl,
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
 * Card Type Control.
 * @mixin
 */
function HasCardTypeControl(){
  this.cardTypeControl = this.node.find('select[name="cardType"]');


  /**
   * Card type selection.
   */
  this.cardTypeControl.on('change',$.proxy(function(coreNode,event){
    console.log('change card type',$(this).val());
    coreNode.setCardType($(this).val());
  },null,this));


  /**
   * Set card cardType.
   * @param {string} cardType - Card cardType.
   */
  this.setCardType=function(cardType){
    var cardNode = $('.cardGroup.selected').data('node');
    this.parent.setDisplay(this.parent.node,cardType);
    cardNode.setCardType(cardType);
  };

  this.syncCardType=function(data){
    if(data.cardType){
      this.cardTypeControl.val(data.cardType);
      this.parent.setDisplay(this.parent.node,data.cardType);
    }
  };
}
