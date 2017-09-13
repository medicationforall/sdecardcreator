/**
 *   SDE Card Creator source file KeywordControl,
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
 * Keyword Control.
 */
function KeywordControl(){
  BaseControl.call(this);
  this.template='<div class="hero monster pet treasure wonder loot arcade keyword">'+
  	'<h2><a class="toggleDisplay" href="">Keyword</a></h2>'+
    '<div class="controlContent hide">'+
    '<a href="" class="keywordSettings" title="keyword Editor"><svg data-reactroot="" class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;">'+
    '<path d="M0 0h512v512H0z" opacity="0"></path>'+
    '<g class="" transform="translate(0,0)" style="touch-action: none;">'+
    '<path d="M234.875 18.78c-26.087 2.367-51.557 8.56-74.875 18.782 15.37 32.763 14.222 66.706-6.72 82.407-20.835 15.617-54.055 7.965-81.124-15.69-16.246 19.452-29.336 41.36-38.875 65.626 33.83 12.333 56.635 37.665 52.94 63.5-3.698 25.835-32.697 43.74-68.626 46.094 2.338 25.796 8.91 50.778 18.937 73.875 17.81-8.182 35.793-11.09 51.095-8.938 13.032 1.87 23.927 7.015 31.156 16.657 15.817 21.097 7.603 54.713-16.78 81.97 19.516 16.35 42.216 29.444 66.594 39.03 12.33-33.828 37.655-56.634 63.5-52.938 25.844 3.697 43.74 32.696 46.094 68.625 26.087-2.365 51.557-8.555 74.875-18.78-15.766-32.997-14.26-67.588 6.843-83.406 9.64-7.23 22.568-9.022 35.594-7.125 15.112 2.16 31.19 10.25 45.563 22.78 16.088-19.345 29.4-41.51 38.875-65.594-33.83-12.332-56.635-37.653-52.938-63.5 3.697-25.846 32.665-43.772 68.594-46.125-2.36-25.944-8.774-50.663-18.906-73.874-32.612 15.117-66.66 13.145-82.282-7.687-15.696-20.944-7.252-53.86 16.688-81-19.52-16.352-42.248-29.447-66.625-39.032-12.332 33.828-37.657 56.66-63.5 52.968-25.846-3.693-43.744-32.696-46.095-68.625zm21.656 95.126c79.626 0 144.376 64.752 144.376 144.375 0 79.626-64.75 144.376-144.375 144.376-79.624 0-144.374-64.75-144.374-144.375 0-79.624 64.75-144.374 144.375-144.374zm0 18.688c-69.524 0-125.686 56.162-125.686 125.687 0 69.526 56.162 125.69 125.687 125.69 69.526 0 125.69-56.164 125.69-125.69 0-69.522-56.164-125.686-125.69-125.686zm.033 15.125c61.094 0 110.625 49.53 110.625 110.624 0 61.095-49.53 110.625-110.625 110.625s-110.625-49.53-110.625-110.626c0-61.095 49.53-110.625 110.625-110.625z">'+
    '</path></g><!-- react-empty: 6 --></svg></a>'+
  	'<div class="hero monster arcade">'+
  		'Affinity '+
  		'<select name="affinity">'+
  			'<option value="citrine">Citrine</option>'+
  			'<option value="citrine amethyst">Citrine Amethyst</option>'+
  			'<option value="citrine emerald">Citrine Emerald</option>'+
  			'<option value="citrine ruby">Citrine Ruby</option>'+
  			'<option value="citrine sapphire">Citrine Sapphire</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="emerald">Emerald</option>'+
  			'<option value="emerald amethyst">Emerald Amethyst</option>'+
  			'<option value="emerald ruby">Emerald Ruby</option>'+
  			'<option value="emerald sapphire">Emerald Sapphire</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="ruby">Ruby</option>'+
  			'<option value="ruby amethyst">Ruby Amethyst</option>'+
  			'<option value="ruby sapphire">Ruby Sapphire</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="sapphire">Sapphire</option>'+
  			'<option value="sapphire amethyst">Sapphire Amethyst</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="amethyst">Amethyst</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="none">None</option>'+
  			'<option value="all">All</option>'+
  		'</select>'+
  	'</div>'+

  	'<div>Keywords <input name="keywordsList" required maxlength="80" /></div>'+
    '</div>'+
  '</div>';


  /**
   * Setup Keyword Control.
   */
  this.setup=function(){
    HasToggleDisplay.call(this);
    HasAffinityControl.call(this);
    HasKeywordListControl.call(this);
  };

  this._constructor();
}
