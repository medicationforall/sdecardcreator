/**
 *   SDE Card Creator source file Ability,
 *   Copyright (C) 2015  James M Adams
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


function Ability(){

//CONSTRUCTOR
this._constructor = function(){
	Ability.counter++;
}


//methods
/**
 *
 */
this.getFormTemplate = function(){
	var template = '<div data-ability="'+Ability.counter+'" class="ability">'+
	'<a href="" class="closeAbility" title="Close">X</a>'+
	'<div class="displayInline">Type <select name="costType">'+
	'<option value="attack">Attack</option>'+
	'<option value="support">Support</option>'+
	'<option value="offensePotion">Offense Potion</option>'+
	'<option value="supportPotion">Support Potion</option>'+
	'<option value="emergencyPotion">Emergency Potion</option>'+
	'<option value="special">Special</option>'+
	'<option disabled>──────────</option>'+
	'<option value="definitionOnly">Definition</option>'+
	'<option value="nameOnly">Name</option>'+
	'</select></div>'+
	'<div class="displayInline">Cost <input class="number" name="cost" type="number" value="1" min="0" max="99" /></div>'+
	'<div>Name <input name="name" value="Ability '+Ability.counter+'" /></div>'+
	'<div>Definition <textarea name="definition" ></textarea></div>'+
	'</div>';

	return template;
}


/**
 *
 */
this.getCardTemplate = function(){
	var template = '<div data-ability="'+Ability.counter+'" class="ability">'+
	'<div class="cost attack">1</div>'+'<span class="name">Ability '+Ability.counter+'</span>'+'<span class="colon">:</span>'+'<span class="definition">stuff</span>'+
	'</div>';

	return template;
}


//main
this._constructor();
}

//static data
Ability.counter = 0;

