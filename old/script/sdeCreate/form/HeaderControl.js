/**
 *   SDE Card Creator source file HeaderControl,
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

function HeaderControl(){

  /**
   *
   */
  this.setup=function(){
    this.node = $(HeaderControl.template).appendTo(this.parent.node);
  };


  /**
   *
   */
  this.register=function(){
    this.setupHeader();
  };


  /**
   *
   */
  this.setupHeader = function(){
    var form = this.closest(Form);
    form.linkToTemplate("title");
    form.linkToTemplate("subTitle");
    form.linkToTemplate("actions");
    form.linkToTemplate("move");
  };
}

HeaderControl.prototype = new CoreTemplate('html/form/HeaderControl.html');
HeaderControl.prototype.constructor = HeaderControl;
