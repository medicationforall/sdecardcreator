/**
 *   SDE Card Creator source file HasAffinityControl,
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
 * Affinity Control.
 * @mixin
 */
function HasAffinityControl(){
  this.affinityControl = this.node.find('select[name="affinity"]');


  /**
   * Affinity selection.
   */
  this.affinityControl.on('change',$.proxy(function(coreNode,event){
    coreNode.setAffinity($(this).val());
  },null,this));


  /**
   * Set card affinity.
   * @param {string} affinity - Card affinity.
   */
  this.setAffinity=function(affinity){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setAffinity(affinity);
  };


  /**
   * Sync affinity from selected card.
   */
  this.syncAffinity=function(data){
    if(data.affinity!==undefined){
      this.affinityControl.val(data.affinity);
    }
  };
}
