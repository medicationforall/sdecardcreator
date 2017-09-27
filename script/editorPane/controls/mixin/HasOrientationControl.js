/**
 *   SDE Card Creator source file HasOrientationControl,
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
 * Orientation Control.
 * @mixin
 */
function HasOrientationControl(){
  this.orientationControl = this.node.find('select[name="orientation"]');


  /**
   * Orientation selection.
   */
  this.orientationControl.on('change',$.proxy(function(coreNode,event){
    coreNode.setOrientation($(this).val());
  },null,this));


  /**
   * Set card orientation.
   * @param {string} orientation - Card orientation.
   */
  this.setOrientation=function(orientation){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setOrientation(orientation);
  };

  /**
   * Sync orientation from selected card.
   */
  this.syncOrientation=function(data){
    if(data.orientation!==undefined){
      this.orientationControl.val(data.orientation);
    }
  };
}
