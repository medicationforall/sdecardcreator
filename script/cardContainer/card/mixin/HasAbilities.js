/**
 *   SDE Card Creator source file HasAbilities,
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
 * Abilities Card mixin.
 * @mixin
 */
function HasAbilities(){
  this.abilities = [];


  /**
   *
   */
  this.loadAbilities=function(data){
    if(data.abilities && data.abilities.length > 0){
      for(var i=0,ability;(ability=data.abilities[i]);i++){
        var abilityNode = new Ability();
        var editForm = $('.editForm').data('node');
        editForm.abilityControl.addAbilityFromCard(abilityNode);
        this.addAbility(abilityNode);
        abilityNode.loadData(ability);
      }
    }
  };


  /**
   *
   */
  this.addAbility=function(ability){
    console.log('card add ability');
    this.abilities.push(ability);
    ability.getCardNode().appendTo(this.node.find('.abilities'));
  };


  /**
   *
   */
  this.removeAbility=function(ability){
    console.warn('implement removeAbility');
  };


  /**
   *
   */
  this.reOrderAbility=function(ability){
    console.warn('implement reOrderAbility');
  };

}
