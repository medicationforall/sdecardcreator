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
   *
   */
  this.addAbilityControl.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();
    coreNode.addAbility();
  },null,this));


  /**
   *
   */
  this.addAbility=function(){
    console.log('add ability');
    var cardNode = $('.cardGroup.selected').data('node');

    var ability = new Ability();
    var formAbility = ability.getFormNode(this.node.find('.abilities')).appendTo(this.node.find('.abilities'));
    cardNode.addAbility(ability);
  };
}
