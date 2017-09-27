/**
 *   SDE Card Creator source file HasKeywords,
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
 * Keywords Card mixin.
 * @mixin
 */
function HasKeywords(){


  /**
   * Set keywords.
   * @param {string} keywords
   */
  this.setKeywords=function(keywords){
      keywords = $("<div>").text(keywords).html();

      this.data.keywordsList=keywords;
      var keywordStore = $('.page').data('keywordStore');

      //set parsed text
      var kText = keywordStore.findKeywords(keywords);
      this.node.find('.keywordsList').html(kText);

      //place keywords on back of card.
      keywordStore.checkKeywords(this.node.find('.front'));
  };


  /**
   * Load keywords from card data.
   * @param {object} data - Card data.
   */
  this.loadCardKeywords=function(data){
    if(data.keywordsList !== undefined){
      this.setKeywords(data.keywordsList);
    }
  };
}
