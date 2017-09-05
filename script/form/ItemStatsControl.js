/**
 *   SDE Card Creator source file ItemStatsControl,
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

function ItemStatsControl(){

  /**
   *
   */
  this.setup=function(){
    this.node = $(ItemStatsControl.template).appendTo(this.parent.node);
  };

  /**
   *
   */
  this.register=function(){
    this.setupItemStat();
  };

  /**
   *
   */
  this.setupItemStat=function(){
    var form = this.closest(Form);
    form.linkToTemplate('itemStats','input',form.parseItemStat);
    this.node.find('input[name=itemStats]').trigger('input');
  };
}

ItemStatsControl.prototype = new CoreTemplate('html/form/ItemStatsControl.html');
ItemStatsControl.prototype.constructor = ItemStatsControl;
