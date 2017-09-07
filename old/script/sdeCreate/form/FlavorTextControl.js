/**
 *   SDE Card Creator source file FlavorTextControl,
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

function FlavorTextControl(){

  /**
   *
   */
  this.setup=function(){
    this.node = $(FlavorTextControl.template).appendTo(this.parent.node);
  };


  /**
   *
   */
  this.register=function(){
    this.setupFlavorText();
  };


  /**
   *
   */
  this.setupFlavorText=function(){
    var form = this.closest(Form);
    var card = this.closest(Card);
    form.link(this.node.find('textarea[name="flavorText"]'),card.node.find('span.flavorText'));
  };
}

FlavorTextControl.prototype = new CoreTemplate('html/form/FlavorTextControl.html');
FlavorTextControl.prototype.constructor = FlavorTextControl;
