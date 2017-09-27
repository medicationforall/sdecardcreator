/**
 *   SDE Card Creator source file HasAddAbilityControl,
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
function HasAddAbilityControl(){
  this.addAbilityControl = this.node.find('.addAbility');


  /**
   * Add ability link click.
   */
  this.addAbilityControl.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();
    coreNode.addAbility();
  },null,this));


  /**
   * Add an ability to the selected card, and adds the abilities formNode.
   */
  this.addAbility=function(){
    var cardNode = $('.cardGroup.selected').data('node');
    var ability = new Ability();
    var formAbility = ability.getFormNode().appendTo(this.node.find('.abilities'));
    cardNode.addAbility(ability);
  };


  /**
   * Register an ability formNode from a loaded card ability.
   */
  this.addAbilityFromCard=function(ability,data){
    var formAbility = ability.getFormNode().appendTo(this.node.find('.abilities'));
    ability.syncForm(data);
  };


  /**
   * Sync abilities from selected card.
   */
  this.syncAbilities=function(abilities){
    //remove existing ability nodes.
    this.node.find('.abilities .ability').detach();

    if(abilities!==undefined && abilities.length>0){
      for(var i=0,ability;(ability = abilities[i]);i++){
        console.log('syncAbilities add ability from card');
        this.addAbilityFromCard(ability,ability.data);
      }
    }
  };
}
