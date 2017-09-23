/**
 *   SDE Card Creator source file HasToggleDisplay,
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
 * Toggle Display Control.
 * @mixin
 */
function HasToggleDisplay(){
  //place the arrow
  this.arrowTemplate = '<svg class="displayArrow inactive" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg">'+
    '<path d="M2 22h20V2z"/>'+
    '<path d="M0 0h24v24H0z" fill="none"/>'+
    '</svg>';

  this.arrowNode = $(this.arrowTemplate).prependTo(this.node.find('.toggleDisplay'));


  /**
   * Toggle display header click.
   */
  this.node.on('click','.toggleDisplay',$.proxy(function(event){
    event.preventDefault();
    this.toggleDisplay();
  },this));


  /**
   * Toggle display action.
   */
  this.toggleDisplay=function(){
    var content = this.node.find('.controlContent');

    if(content.hasClass('hide')){
      content.removeClass('hide').animateCss('flipInX');
      this.arrowNode.removeClass('inactive').addClass('active');

    }else{
      content.addClass('hide');
      this.arrowNode.removeClass('active').addClass('inactive');
    }
  };
}
