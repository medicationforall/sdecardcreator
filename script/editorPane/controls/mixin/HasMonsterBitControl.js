/**
 *   SDE Card Creator source file HasMonsterBitControl,
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
 * Monster Bit Control.
 * @mixin
 */
function HasMonsterBitControl(){
  this.monsterBit = this.node.find('select[name="bit"]');


  /**
   * Monster bit selection.
   */
  this.monsterBit.on('change',$.proxy(function(coreNode,event){
    event.preventDefault();

    coreNode.setBit($(this).val());
  },null,this));


  /**
   * Set card bit.
   * @param {string} bit - Card bit.
   */
  this.setBit=function(bit){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setBit(bit);
  };


  /**
   * Sync bit from selected card.
   */
  this.syncBit=function(data){
    if(data.bit!==undefined){
      this.monsterBit.val(data.bit);
    }
  };
}
