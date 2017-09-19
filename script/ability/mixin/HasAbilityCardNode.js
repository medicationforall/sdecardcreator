/**
 *   SDE Card Creator source file HasAbilityCardNode,
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
 * Ability Card Node mixin.
 * @mixin
 */
function HasAbilityCardNode(){
    this.cardNode=undefined;

    /**
     * Get Card Template.
     * @return {string} Card HTML template.
     */
    this.getCardTemplate=function(){
      var template = '<div data-ability="'+Ability.counter+'" class="ability">'+
      '<div class="cost attack">1</div>'+'<span class="name">Ability '+Ability.counter+'</span>'+'<span class="colon">:</span>'+'<span class="definition"></span>'+
      '</div>';

      return template;
    };


    /**
     * Get Card node.
     * @return {object} Card resolved to a jQuery selector.
     */
    this.getCardNode=function(){
      if(this.cardNode===undefined){
        this.cardNode = $(this.getCardTemplate());
        this.cardNode.data('node',this);
      }
      return this.cardNode;
    };

    this.getCardAbilityNodes=function(){
      return $('.cardGroup.selected .ability[data-ability="'+this.cardNode.data('ability')+'"]');
    };
}
