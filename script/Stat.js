/**
 *   SDE Card Creator source file Stat,
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

'use strict';
function Stat(name, permissions, value){

	//DATA
	//make this an html template
	this.template='<div class="'+permissions+' stat '+name+'">'+
			'<div class="offense">0</div>'+
			'<div class="defense"></div>'+
			'<div class="diceList">'+
			'<div class="dice star">0</div>'+
			'<div class="dice blue">0</div>'+
			'<div class="dice red">0</div>'+
			'<div class="dice green">0</div>'+
			'<div class="dice orange">0</div>'+
			'<div class="dice purple">0</div>'+
			'</div>'+

		'</div>';

	//@todo card doesn't exist yet so I have a timing issue
	this.node=$(this.template).appendTo(".card .stats");


	//Constructor
	/**
	 *
	 */
	this._constructor=function(){

		if(permissions === undefined){
			this.permissions="";
		}else{
			this.permissions = permissions;
		}

		if(value === undefined){
			this.value="";
		}else{
			this.value = value;
		}

		//set initial value
		this.setValue(this.value);
	}

	//methods
	/**
	 *
	 */
	this.setValue = function(value){
		// empty hide logic
		if(value===""){
			this.node.css("display",'none');
		}else{
			this.node.css("display",'');
		}

		//reset state
		this.node.find('.offense').removeClass('melee missile magic').css("visibility","hidden");
		this.node.find('.defense').css("visibility","hidden");
		this.node.find('.diceList').find('div').css("display","none");

		//set the value
		var re = /\b(\d+)(sw|ma|mi|st|b|r|g|o|p|)\b|\b(sh)\b/g
		value.replace(re,$.proxy(this.parseValue,this));
	}


	/**
	 *
	 */
	this.parseValue = function(match,number,type,shield){
		//console.log('parsing stat',arguments);
		if(number !== undefined && type !== undefined){
				if(type==='b'){
					$(this.node).find('.blue').css("display","").text(number);
				}else if(type==='r'){
					$(this.node).find('.red').css("display","").text(number);
				}else if(type==='g'){
					$(this.node).find('.green').css("display","").text(number);
				}else if(type==='p'){
					$(this.node).find('.purple').css("display","").text(number);
				}else if(type==='o'){
					$(this.node).find('.orange').css("display","").text(number);
				}else if(type==='st'){
					$(this.node).find('.star').css("display","").text(number);
				}else if(type==='sw'){
					$(this.node).find('.offense').addClass('melee').css("visibility","").text(number);
				}else if(type==='mi'){
					$(this.node).find('.offense').addClass('missile').css("visibility","").text(number);
				}else if(type==='ma'){
					$(this.node).find('.offense').addClass('magic').css("visibility","").text(number);
				}
		} else if(shield !==undefined){
			$(this.node).find('.defense').css("visibility","");
		}
	}


	//main
	this._constructor();
}
