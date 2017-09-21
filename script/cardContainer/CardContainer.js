/**
 *   SDE Card Creator source file CardContainer,
 *   Copyright (C) 2015  James M Adams
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
 * Stores all the cards on the page.
 */
function CardContainer(){
  this.node =undefined;


  /**
   * Construct the Card Container.
   */
  this._construct=function(){
    this.node = $('.cardContainer');
    this.node.data('node',this);

    HasCardSelect.call(this);
  };


  /**
   * Collect the json data for all of the child cards.
   * @return {object}
   */
  this.gatherData=function(){
    console.log('call gather data for the cardContainer');
    var data = [];
    var cards = this.node.find('.cardGroup');

    for(var i=0,card;(card=cards[i]);i++){
      var cardNode = $(card).data('node');
      data.push(cardNode.gatherData());
    }

    return data;
  };


  /**
   * Load Data.
   * @param {object} data - JSON data.
   * @todo will need a flag to indicate if already existing cards should be cleared.
   */
  this.loadData=function(data){
    console.log('card container load data');

    //should we clear?
    this.deleteCards();

    for(var i=0,cardData;(cardData=data.cards[i]);i++){
      this.addCard(true,cardData);
    }
  };


  this.deleteCards=function(){
    $('.cardGroup').remove();
  };



  /**
   *
   */
  this.addCard=function(animate,data){
    this.deselectCards();

    var card = new Card(animate);
    if(data){
      card.loadData(data);
    }
  };

  this._construct();
}
