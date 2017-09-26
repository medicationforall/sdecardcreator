/**
 *   SDE Card Creator source file HasCardSelect,
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
 * Card Select mixin.
 * @mixin
 */
function HasCardSelect(){


  /**
   * Card selection event.
   */
  this.node.on('click','.card',$.proxy(function(coreNode,event){
    var card = $(this).closest('.cardGroup').data('node');
    coreNode.selectCard(card);
  },null,this));


  /**
   * Select card, marks a card as selected.
   * @param {object} sCard - the card to select.
   */
  this.selectCard=function(sCard){
    //deselect existing cards
    var cards = $('.cardGroup');
    for(var i=0,card;(card=cards[i]);i++){
      if($(card).hasClass('selected')){
        $(card).removeClass('selected');
      }
    }
    sCard.node.addClass('selected');

    this.syncForm(sCard);
  };

  /**
   * Card is selected, sync the form.
   * @param {object} card - Selected card.
   */
  this.syncForm=function(card){
    var editForm = $('.editForm').data('node');
    editForm.sync(card.data,card.abilities);
  };


  /**
   * Deselects any selected cards.
   */
  this.deselectCards=function(){
    //deselect existing cards
    var cards = $('.cardGroup');
    for(var i=0,card;(card=cards[i]);i++){
      if($(card).hasClass('selected')){
        $(card).removeClass('selected');
      }
    }
  };

  /**
   *
   */
  this.deleteSelectedCard=function(){
    var selected = $('.cardGroup.selected');
    var sibling = this.getSibling(selected);

    if(sibling){
      var card = sibling.data('node');
      this.selectCard(card);
    }
    selected.remove();
  };


  /**
   *
   */
  this.duplicateSelectedCard=function(){
    var selected = $('.cardGroup.selected');
    var selectedData = selected.data('node').gatherData();
    var newCard = new Card(true, selected);
    newCard.loadData(selectedData);
    this.selectCard(newCard);
  };


  /**
   *
   */
  this.moveSelectedCardUp=function(){
    var selected = $('.cardGroup.selected');
    if(selected.prev().length > 0){
      var sibling = selected.prev();
      $(sibling).before(selected);
    }
  };


  /**
   *
   */
  this.moveSelectedCardDown=function(){
    var selected = $('.cardGroup.selected');
    if(selected.next().length > 0){
      var sibling = selected.next();
      $(sibling).after(selected);
    }
  };


  /**
   *
   */
  this.getSibling=function(selected){
    if(selected.prev().length > 0){
      return selected.prev();
    } else if(selected.next().length > 0){
      return selected.next();
    }
    return undefined;
  };
}
