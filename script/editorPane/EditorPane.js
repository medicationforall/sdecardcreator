/**
 *   SDE Card Creator source file EditorPane,
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
 * Editor Pane.
 * @class
 * @todo this component can probably go away.
 */
function EditorPane(){
  this.node = undefined;


  /**
   * Register the editorPane domNode.
   */
  this._construct=function(){
    this.node = $('.editorPane');
    this.node.data('node',this);

    this._setup();
  };


  /**
   * Creates an EditFormNode.
   */
  this._setup=function(){
    new EditForm();
  };

  this._construct();
}
