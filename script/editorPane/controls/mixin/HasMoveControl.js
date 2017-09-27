/**
 *   SDE Card Creator source file HasMoveControl,
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
 * Move Control.
 * @mixin
 */
function HasMoveControl(){
  this.MoveControl = this.node.find('input[name="move"]');


  /**
   * Move text input.
   */
  this.MoveControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setCardMove($(this).val());
  },null,this));


  /**
   * Set card move.
   * @param {string} move - Card move.
   */
  this.setCardMove=function(move){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setMove(move);
  };


  /**
   * Sync move from selected card.
   */
  this.syncMove=function(data){
    if(data.move!==undefined){
      this.MoveControl.val(data.move);
    }
  };
}
