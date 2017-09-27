/**
 *   SDE Card Creator source file HasScaleControl,
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
 * Scale Control.
 * @mixin
 */
function HasScaleControl(){
  this.scaleControl=this.node.find('input[name="cardScale"]');


  /**
   * Scale text input.
   */
  this.scaleControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setScale($(this).val());
  },null,this));


  /**
   * Set card scale.
   * @param {string} scale - Card scale.
   */
  this.setScale=function(scale){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setScale(scale);
  };

  /**
   * Sync scale from selected card.
   */
  this.syncScale=function(data){
    if(data.scale!==undefined){
      this.scaleControl.val(data.scale);
    }
  };
}
