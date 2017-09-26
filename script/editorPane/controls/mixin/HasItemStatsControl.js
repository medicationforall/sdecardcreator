/**
 *   SDE Card Creator source file HasItemStatsControl,
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
 * Item Stats Control.
 * @mixin
 */
function HasItemStatsControl(){
  this.itemStatsControl = this.node.find('input[name="itemStats"]');


  /**
   * Item stats text input.
   */
  this.itemStatsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setItemStats($(this).val());
  },null,this));


  /**
   * Set card item stats.
   * @param {string} value - Card ItemStats.
   */
  this.setItemStats=function(value){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setItemStats(value);
  };


  /**
   * Sync item stats from selected card.
   */
  this.syncItemStats=function(data){
    if(data.itemStats !== undefined){
      this.itemStatsControl.val(data.itemStats);
    }
  };
}
