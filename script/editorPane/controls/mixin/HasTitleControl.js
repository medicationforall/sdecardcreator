/**
 *   SDE Card Creator source file HasTitleControl,
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
 * Title Control.
 * @mixin
 */
function HasTitleControl(){
  this.titleControl = this.node.find('input[name="title"]');


  /**
   * Title text input.
   */
  this.titleControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setCardTitle($(this).val());
  },null,this));


  /**
   * Set card title.
   * @param {string} title - Card title.
   */
  this.setCardTitle=function(title){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setTitle(title);
  };

  /**
   * Sync title from selected card.
   */
  this.syncTitle=function(data){
    if(data.title!==undefined){
      this.titleControl.val(data.title);
    }
  };
}
