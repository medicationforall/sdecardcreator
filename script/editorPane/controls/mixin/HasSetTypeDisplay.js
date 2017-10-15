/**
 *   SDE Card Creator source file HasSetTypeDisplay,
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
 * Type Display Control.
 * @mixin
 */
function HasSetTypeDisplay(){

  /**
   * Set what controls are displayed.
   * @param {object} node - A domNode.
   * @param {string} type - Card type.
   */
  this.setDisplay=function(node,type){
    node.find('.hero, .monster, .pet, .treasure, .loot, .wonder, .explore, .arcadeSolo, .arcadeGang, .command, .timeout').css('display','none');
    node.find('.'+type).css('display','');
  };
}
