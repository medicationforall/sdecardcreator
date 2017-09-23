/**
 *   SDE Card Creator source file HasBit,
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
 * Bit Card mixin.
 * @mixin
 */
function HasBit(){
  /**
   * Set bit on the card.
   * @param {string} bit - Card bit.
   */
  this.setBit=function(bit){
    this.data.bit = bit;
    this.node.find('.bit').removeClass('eight sixteen start special super').addClass(bit);
  };


  /**
   * Load bit from card data.
   * @param {object} data - Card Data.
   */
  this.loadCardBit=function(data){
    if(data.bit !== undefined){
      this.setBit(data.bit);
    }
  };
}
