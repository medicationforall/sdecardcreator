/**
 *   SDE Card Creator source file CardControl,
 *   Copyright (C) 2016  James M Adams
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

function CardControl(){

  /**
   * Puts HTML template into the page.
   */
  this.setup=function(){
    this.node = $(CardControl.template).appendTo(this.parent.node);
    this.each('setup');
  };


  /**
   * Registers click handlers.
   */
  this.register=function(){
    this.setupCardScale();
    this.setupCardType();

    //monster
    this.setupRegionColor();

    //loot treasure
    this.setupOrientation();
  };


  /**
   * On CardScale change updates the card.
   */
  this.setupCardScale=function(){
    this.node.find('input[name=cardScale]').on('input',$.proxy(function(control,event){
      control.closest(Card).setScale($(this).val());
    },undefined,this));
  };


  /**
   * When cardType changes updates the form and the card.
   */
  this.setupCardType=function(){
    this.node.find("select[name=cardType]").change($.proxy(function(control,event){
      var form = control.closest(Form);
      var card = form.closest(Card);
      var imc = form.closest(ImageControl);
      var type = $(this).val();

      //modify displayed elements
      form.setDisplay(form.node,type);
      form.setDisplay(card.node.find('.card'),type);

      //modify card color
      card.setType(type);

      //set the default avatar
      imc.setProfileDefaultAvatar($(this).val());
      form.checkStatsForDisplay();
    },undefined,this));

    //trigger the card type change to initialize the card.
    this.node.find("select[name=cardType]").trigger('change');
  };


  /**
   * When the region color changes sets it for the card.
   */
  this.setupRegionColor=function(){
    this.node.find("select[name=region]").change($.proxy(function(control,event){
      var card = control.closest(Card).node.find('.card');
      $(this).find('option').each(function() {
        card.removeClass($(this).val());
      });

      card.addClass($(this).val());
    },undefined,this));

    //trigger the region color change to initialize the card.
    this.node.find("select[name=region]").trigger('change');
  };

  /**
   * When the Item orientation changes sets it for the card.
   */
  this.setupOrientation=function(){
    this.node.find('select[name="orientation"]').change($.proxy(function(control,event){
      control.closest(Card).setOrientation($(this).val());
    },undefined, this));
  };
}

CardControl.prototype=new CoreTemplate('html/form/CardControl.html');
CardControl.prototype.constructor = CardControl;
