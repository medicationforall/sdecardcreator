/**
 *   SDE Card Creator source file BitControl,
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
 * Bit Control.
 * @mixin
 */
function BitControl(){
  BaseControl.call(this);

  this.template='<div class="monster bit">'+
    '<h2><a class="toggleDisplay" href="">monster-bit</a></h2>'+
    '<div class="controlContent hide">'+
    '<select name="bit">'+
      '<option value="eight">8 bit</option>'+
      '<option value="sixteen">16 bit</option>'+
      '<option value="start">Start</option>'+
      '<option value="special">Special</option>'+
      '<option value="super">Super</option>'+
    '</select>'+
    '</div>'+
  '</div>';


  /**
   * Setup flavor text Control.
   */
  this.setup=function(){
    HasToggleDisplay.call(this);
    HasMonsterBitControl.call(this);
  };


  /**
   * Sync bit from selected card.
   */
  this.sync=function(data){
    this.syncBit(data);
  };

  this._constructor();
}
