/**
 *   SDE Card Creator source file CardModifierControl,
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
 * Card Modifier Control.
 * @mixin
 */
function CardModifierControl(){
  BaseControl.call(this);
  this.template='<div class="cardModifier">'+
      '<h2><a class="toggleDisplay" href="">Card Modifier</a></h2>'+
      '<div class="controlContent hide">'+
      '<ul>'+
      '<li><a href="" class="duplicateCardButton cardModifier" data-action="duplicate">Duplicate Card</a></li>'+
      '<li><a href="" class="moveCardUpButton cardModifier" data-action="up">Move Card Up</a></li>'+
      '<li><a href="" class="moveCardDownButton cardModifier" data-action="down">Move Card Down</a></li>'+
      '<li><a href="" class="deletCardButton cardModifier" data-action="delete">Delete Card</a></li>'+
      '</ul>'+
      '</div>'+
    '</div>';

  /**
   * Setup card modifier control.
   */
  this.setup=function(){
    HasToggleDisplay.call(this);
    HasCardModifierControl.call(this);
  };

  this._constructor();
}
