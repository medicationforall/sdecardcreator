/**
 *   SDE Card Creator source file HasRegionControl,
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
 * Region Control.
 * @mixin
 */
function HasRegionControl(){
  this.regionControl = this.node.find('select[name="region"]');


  /**
   * Region selection.
   */
  this.regionControl.on('change',$.proxy(function(coreNode,event){
    coreNode.setRegion($(this).val());
  },null,this));


  /**
   * Set card region.
   * @param {string} region - Card region.
   */
  this.setRegion=function(region){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setRegion(region);
  };

  /**
   * Sync region from selected card.
   */
  this.syncRegion=function(data){
    if(data.region!==undefined){
      this.regionControl.val(data.region);
    }
  };
}
