/**
 *   SDE Card Creator source file HasHelpButton,
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
 * Help Button.
 * @mixin
 */
function HasHelpButton(){
  this.helpButton = this.node.find('.helpButton');


  /**
   * Help icon click.
   */
  this.helpButton.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();

    coreNode.toggleHelp();
  },null,this));


  /**
   * Toggle help control.
   */
  this.toggleHelp=function(){
    this.node.find('.helpBlock').toggle();
  };
}
