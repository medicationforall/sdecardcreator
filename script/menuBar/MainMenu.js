/**
 *   SDE Card Creator source file MainMenu,
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
 * Main Menu Controls.
 * @class
 */
function MainMenu(){
  this.node=undefined;


  /**
   * Main menu constructor.
   */
  this._constructor = function(){
    this._setup();
  };


  /**
   * Create the main menu.
   */
  this._setup=function(){
    this.node = $('.menuBar');
    //HasGatherData.call(this);
    HasOpenMenuButtons.call(this);
    //HasAddMenu.call(this);
    HasSaveMenu.call(this);
    HasLoadMenu.call(this);
    HasAddCardButton.call(this);
    //HasListNameInput.call(this);
    //HasCustomizeMenu.call(this);

    $.getJSON('config.json',$.proxy(function(data){
      if(data.enableShare){
        this.node.find('.shareButton').css('display','inline-block');
        this.servlet=data.servlet;
        HasShare.call(this);
      }
    },this));

    //set coreNode
    $.data(this.node[0],'coreNode',this);
  };


  this._constructor();
}
