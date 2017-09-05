/**
 *   Mjs source file Core,
 *   Copyright (C) 2016  James M Adams
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

function CoreTemplate(html){
	this.html=html;
	this.node=undefined;
	this.children=[];
}

CoreTemplate.prototype = new Core();
CoreTemplate.prototype.constructor = CoreTemplate;


/**
 * Load lifecycle that loads an html template and adds it to the list of deferreds.
 *@override
 */
CoreTemplate.prototype.load=function(){
	var list =[];

	if(this.html){
		var deferred;
		if(this.constructor.template===undefined){
			deferred = $.get(this.html,$.proxy(function(data){
				//console.log('loaded template',this.html,this.class);
				this.constructor.template=data;
			},this));
			list.push(deferred);
		}
	}
	return list.concat(this.each('load'));
};
