/**
 *   SDE Card Creator source file HasFlavorTextControl,
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
 * Flavor Text Control.
 * @mixin
 */
function HasFlavorTextControl(){
  this.flavorTextControl = this.node.find('textarea[name="flavorText"]');


  /**
   * Flavor text input.
   */
  this.flavorTextControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setFlavorText($(this).val());
  },null,this));


  /**
   * Set card flavorText.
   * @param {string} flavorText - Card flavorText.
   */
  this.setFlavorText=function(flavorText){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setFlavorText(flavorText);
  };


  /**
   * Sync flavor text from selected card.
   */
  this.syncFlavorText=function(data){
    if(data.flavorText!==undefined){
      this.flavorTextControl.val(data.flavorText);
    }
  };
}
