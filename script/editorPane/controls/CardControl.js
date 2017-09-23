/**
 *   SDE Card Creator source file CardControl,
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
 * Card Control.
 * @class
 */
function CardControl(){
  BaseControl.call(this);
  this.template='<div class="cardOverall">'+
  '<h2><a class="toggleDisplay" href="">Card</a></h2>'+
  '<div class="controlContent hide">'+
  	'Type <select name="cardType">'+
  		'<option value="hero">Hero</option>'+
  		'<option value="monster">Monster</option>'+
  		'<option value="pet">Pet</option>'+
  		'<option disabled>----------</option>'+
  		'<option value="loot">Loot</option>'+
  		'<option value="treasure">Treasure</option>'+
  		'<option value="wonder">Wonder</option>'+
      '<option value="explore">Explore</option>'+
  		'<option disabled>----------</option>'+
  		'<option value="timeout">Timeout</option>'+
  		'<option disabled>-Experimental-</option>'+
  		'<option value="arcade">Arcade</option>'+
  		'<option value="command">Command</option>'+
  	'</select>'+

  	'<div class="cardScale">'+
  		'Scale <input class="number" name="cardScale" value="1.0" type="number" step="0.1" min="0.1" />'+
  	'</div>'+

  	'<div class="monster timeout">'+
  		'Color '+
  		'<select name="region">'+
  			'<option value="red">Red</option>'+
  			'<option value="green">Green</option>'+
  			'<option value="purple">Purple</option>'+
  			'<option value="yellow">Yellow</option>'+
  		'</select>'+
  	'</div>'+

  	'<div class="treasure loot">'+
  		'Orientation '+
  		'<select name="orientation">'+
  			'<option value="ruby">Top</option>'+
  			'<option value="emerald">Right</option>'+
  			'<option value="sapphire">Bottom</option>'+
  			'<option value="citrine">Left</option>'+
  		'</select>'+
  	'</div>'+
    '</div>'+
  '</div>';


  /**
   * Setup card control.
   */
  this.setup=function(){
    HasToggleDisplay.call(this);
    HasCardTypeControl.call(this);
    HasScaleControl.call(this);
    HasRegionControl.call(this);
    HasOrientationControl.call(this);
  };

  this._constructor();
}
