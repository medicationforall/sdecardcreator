/**
 *   SDE Card Creator source file StatsControl,
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
 * Stats Control.
 * @class
 */
function StatsControl(){
  BaseControl.call(this);
  this.template='<div class="hero monster pet arcadeSolo stats">'+
    '<h2><a class="toggleDisplay" href="">Stats</a></h2>'+
    '<div class="controlContent hide">'+
    '<a href="" class="helpButton" title="Stats Help">'+
    '<svg data-reactroot="" class="Icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" style="height: 32px; width: 32px;">'+
    '<path d="M0 0h512v512H0z" opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;">'+
    '<path d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm0 30c-66.274 0-120 40.294-120 90 0 30 60 30 60 0 0-16.57 26.862-30 60-30 33.138 0 60 13.43 60 30s-30 15-60 30c-1.875.938-3.478 2.126-4.688 3.28C226.53 244.986 226 271.926 226 286v15c0 16.62 13.38 30 30 30 16.62 0 30-13.38 30-30v-15c0-45 90-40.294 90-90s-53.726-90-120-90zm0 240a30 30 0 0 0-30 30 30 30 0 0 0 30 30 30 30 0 0 0 30-30 30 30 0 0 0-30-30z"></path></g><!-- react-empty: 6 --></svg></a>'+
    '<div class="helpBlock">'+
      '<div class="helpUnit">'+
      '<h3>Dice Types</h3>'+
      '<ul>'+
        '<li>Star: 1st</li>'+
        '<li>Blue: 1b</li>'+
        '<li>Red: 1r</li>'+
        '<li>Green: 1g</li>'+
        '<li>Purple: 1p</li>'+
        '<li>Orange: 1o</li>'+
      '</ul>'+
      '</div>'+

      '<div class="helpUnit">'+
      '<h3>Modifiers</h3>'+
      '<ul>'+
        '<li>Melee: 1sw</li>'+
        '<li>Missile: 1mi</li>'+
        '<li>Magic: 1ma</li>'+
        '<li>Shield: sh</li>'+
      '</ul>'+
      '</div>'+
    '</div>'+

    '<div class="hero monster pet arcadeSolo">STR <input name="STR" value="1sw 3b" /></div>'+
    '<div class="hero monster pet arcadeSolo">ARM <input name="ARM" value="2b 1r sh" /></div>'+
    '<div class="arcadeSolo">RNG <input name="RNG" value="6rg"/></div>'+
    '<div class="hero monster">WILL <input name="WILL" value="3b" /></div>'+
    '<div class="hero monster">DEX <input name="DEX" value="3b" /></div>'+
    '<div class="hero pet monster arcadeSolo displayInline">Wounds <input class="number" type="number" name="wounds" value="5" min="-9" max="99" /></div>'+
    '<div class="monster displayInline">Skull Points <input class="number" type="number" name="skulls" value="1" min="-9" max="99" /></div>'+
    '<div class="hero displayInline">Potions <input class="number" type="number" name="potions" value="1" min="-9" max="99" /></div>'+
    '<div class="pet displayInline">Cost <input class="number" type="number" name="cost" value="1" min="-9" max="99" /></div>'+
  '</div>'+
  '</div>';


  /**
   * Setup stats control.
   */
  this.setup=function(){
    HasToggleDisplay.call(this);
    HasHelpButton.call(this);
    HasStatsControl.call(this);
  };


  /**
   * Sync stats from selected card.
   */
  this.sync=function(data){
    this.syncStats(data);
  };

  this._constructor();
}
