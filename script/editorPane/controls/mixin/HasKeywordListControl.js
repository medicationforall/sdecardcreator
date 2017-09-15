/**
 *   SDE Card Creator source file HasKeywordListControl,
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
 * Keyword List Control.
 * @mixin
 */
function HasKeywordListControl(){
  this.keywordList = this.node.find('input[name="keywordsList"]');


  /**
   *
   */
  this.keywordList.on('input',$.proxy(function(coreNode,event){
    coreNode.setKeywords($(this).val());
  },null,this));


  /**
   *
   */
  this.setKeywords=function(keywords){
    console.log('attempting to set keywords');
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setKeywords(keywords);
  };
}
