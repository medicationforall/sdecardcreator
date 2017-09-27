/**
 *   SDE Card Creator source file HasCardHeader,
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
 * Card Header mixin.
 * @mixin
 */
function HasCardHeader(){
  /**
   * Set card Title.
   * @param {string} title
   */
  this.setTitle=function(title){
    if(title !== undefined && title !==''){
      this.data.title = title;
      this.node.find('.title').text(title);
    }else{
      this.data.title=undefined;
      this.node.find('.title').text('title');
    }
  };


  /**
   * Set card SubTitle.
   * @param {string} subTitle
   */
  this.setSubTitle=function(subTitle){
    if(subTitle !== undefined && subTitle !==''){
      this.data.subTitle = subTitle;
      this.node.find('.subTitle').text(subTitle);
    }else{
      this.data.subTitle=undefined;
      this.node.find('.subTitle').text('subTitle');
    }
  };


  /**
   * Set card Move.
   * @param {string} move
   */
  this.setMove=function(move){
    if(move !== undefined && move !==''){
      this.data.move = move;
      this.node.find('.move').text(move);
    }else{
      this.data.move=undefined;
      this.node.find('.move').text('6');
    }
  };


  /**
   * Set card Actions.
   * @param {string} actions
   */
  this.setActions=function(actions){
    if(actions !== undefined && actions !==''){
      this.data.actions = actions;
      this.node.find('.actions').text(actions);
    }else{
      this.data.move=undefined;
      this.node.find('.actions').text('3');
    }
  };


  /**
   * Load card header information from card data.
   * @param {object} data - Card Data.
   */
  this.loadCardHeader=function(data){
    if(data.title !== undefined){
      this.setTitle(data.title);
    }

    if(data.subTitle !== undefined){
      this.setSubTitle(data.subTitle);
    }

    if(data.move !== undefined){
      this.setMove(data.move);
    }

    if(data.actions !== undefined){
      this.setActions(data.actions);
    }
  };
}
