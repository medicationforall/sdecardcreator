/**
 *   SDE Card Creator source file EditForm,
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
 * Edit Form.
 */
function EditForm(){
  this.template='<div class="editForm form"></div>';
  this.node=undefined;


  /**
   *
   */
  this._construct=function(){
    var editorPane = $('.editorPane').data('node');
    this.node=$(this.template).appendTo(editorPane.node);
    this.node.data('node',this);

    HasSetTypeDisplay.call(this);
    this._setup();
  };


  /**
   *
   */
  this._setup=function(){
    new CardControl();
    new HeaderControl();
    new ImageControl();
    new StatsControl();
    new KeywordControl();
    new AbilityControl();
    new FlavorTextControl();
    this.setDisplay(this.node,'hero');
  };

  this._construct();
}
