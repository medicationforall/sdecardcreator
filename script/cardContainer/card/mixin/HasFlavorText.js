/**
 *   SDE Card Creator source file HasFlavorText,
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
 * Flavor Text Card mixin.
 * @mixin
 */
function HasFlavorText(){


  /**
   * Set Flavor Text
   * @param {string} flavorText
   */
  this.setFlavorText=function(flavorText){
    this.data.flavorText = flavorText;
    this.node.find('.flavorText').text(flavorText);
  };


  /**
   *
   */
  this.loadCardFlavorText=function(data){
    if(data.flavorText !== undefined){
      this.setFlavorText(data.flavorText);
    }
  };
}
