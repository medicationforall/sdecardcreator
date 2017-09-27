/**
 *   SDE Card Creator source file HasActionsControl,
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
 * Add Ability Control.
 * @mixin
 */
function HasActionsControl(){
  this.ActionsControl = this.node.find('input[name="actions"]');


  /**
   * Actions text input.
   */
  this.ActionsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setCardActions($(this).val());
  },null,this));


  /**
   * Set card actions.
   * @param {string} actions - Card actions.
   */
  this.setCardActions=function(actions){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setActions(actions);
  };


  /**
   * Sync actions from selected card.
   */
  this.syncActions=function(data){
    if(data.actions!==undefined){
      this.ActionsControl.val(data.actions);
    }
  };
}
