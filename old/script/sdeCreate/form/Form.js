/**
 *   SDE Card Creator source file Form,
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

function Form(){
  /**
   * Create the child node form controls.
   */
  this.init=function(){
    this.add(new CardControl());
    this.add(new HeaderControl());
    this.add(new ImageControl());
    this.add(new ItemStatsControl());
    this.add(new StatsControl());
    this.add(new KeywordControl());
    this.add(new AbilityControl());
    this.add(new BitControl());
    this.add(new FlavorTextControl());

    this.each('init');
  };

  /**
   * Add the html template to the page.
   */
  this.setup=function(template){
    this.node = $(Form.template).appendTo('.pageContent');
    this.each('setup');
  };

  /**
   * Register lifecycle.
   */
  this.register=function(){
    this.setupListeners();
    this.each('register');
  };


  /**
   * Set what form inpuuts are displayed based on the card type.
   *@todo try moving this logic into the CSS code.
   */
  this.setDisplay=function(node,type){
    node.find('.hero, .monster, .pet, .treasure, .loot, .wonder, .explore, .arcade, .command, .timeout').css('display','none');
    node.find('.'+type).css('display','');
  };


  /**
   * Mark card stats for display if the input for it is empty.
   */
  this.checkStatsForDisplay = function(){
    var card= this.closest(Card).node;
    var front = this.closest(Card).node.find('.card .front');

    this.node.find('.stats input').each($.proxy(function(front){
      if($(this).val()===''){
        card.find('.stat.'+$(this).attr('name')).css('display','none');
      }
    },undefined,front));
  };


  /**
   * Add the default ability for Hero, Monster, and pet cards.
   *@todo Move to ability Control.
   */
  this.initializeAbility = function(){
    console.log('initialize ability');
    $('.addAbility').trigger('click');
    $('.form .ability textarea[name="definition"]').val('+1R -2B 3G 4O 5P 1ST 0MI 1MA 2SW 3RG AUGMENT FIRE STR WILL DEX ARM 1AC 2MO 0SH +1HE').trigger('input');
  };


  /**
   * Parse the item stat input value on input change.
   *@todo move to ItemStatsControl.
   */
  this.parseItemStat = function(text){
    text = this.findDice(text);
    text = this.findAffinity(text);
    text = this.findKeywords(text);
    return this.findStats(text);
  };


  /**
   *
   */
  this.setupListeners = function(event){
    console.log('form setup listeners');
    $('.form').on('checkKeywords',function(event){
      this.checkKeywords();
    }.bind(this));

    //$('.form').on('resolved-keywords',function(event){
    this.initializeAbility();
    //}.bind(this));

    $('.form').on('reset',this.reset);
  };


  /**
   * Links a form stat input to a card span
   */
  this.linkToTemplateStat = function(name,stat){
    //console.log('linkToTemplateStat')
    $("input[name='"+name+"']").on('input',function(event){
    stat.setValue($(this).val());
    });
  };


  /**
   *As the input changes it modifies the template linked span
   */
  this.linkToTemplate = function(name,tag,parser,checker){
    //resolve tag
    if(tag === undefined){
      tag = 'input';
    }
    var input = tag+'[name="'+name+'"]';
    var output = 'span.'+name;
    this.link(input,output,parser,checker);
  };


  /**
   *Generic linker which takes an input node, output node, parser callback, and checker callback.
   */
  this.link = function(inputSelector,outputSelector,parser,checker){

    this.node.find(inputSelector).on('input', $.proxy(function(form,event){
      var output = form.closest(Card).node.find(outputSelector);

      //store the reset value if it's not defined
      if(output.data('reset')===undefined){
      output.data('reset',output.first().text());
      }

      //if the input is not empty
      if($(this).val() !== ''){
        if(parser===undefined){
          output.text($(this).val());
        } else{
          //parses out html without placing the string into the domNode
          var text = $("<div/>").html($(this).val()).text();
          output.html($.proxy(parser,form)(text));
        }
      } else{ //reset back to the default value
        output.text(output.data('reset'));
      }

      //run the check if one is provided
      if(checker){
        $.proxy(checker,form)();
      }
    },undefined,this));
  };


  /**
   *Passthrough method that calls findKeywords on the keyword store.
   */
  this.findKeywords =  function(text){
    text = this.closest(KeywordStore).findKeywords(text);
    text = this.closest(KeywordStore).findNKeywords(text);
    return text;
  };


  /**
   *@todo Move to keywordsStore
   */
  this.findDice = function(text){
    return this.closest(KeywordStore).findDice(text);
  };

  /**
   *@todo figure out where this method should go.
   */
  this.findAffinity = function(text){
    return this.closest(KeywordStore).findAffinity(text);
  };

  /**
   *@todo figure out where this should go.
   */
  this.findStats = function(text){
    return this.closest(KeywordStore).findStats(text);
  };

  /**
   * @todo move to ability control
   */
  this.linkAbilityType = function(formNode, cardNode){
    $(formNode).find('select[name="costType"]').change(function(event){
      var parent = $(this).parent().parent();

      //reset
      $(cardNode).find('.name, .colon, .definition').css('display','');
      $(parent).find('input[name="name"],input[name="cost"], textarea[name="definition"]').parent().css('display','');
      $(cardNode).find('.cost').removeClass('attack support emergencyPotion supportPotion offensePotion special definitionOnly nameOnly');

      $(cardNode).find('.cost').addClass($(this).val());

      //card ability display
      if($(this).val()==='definitionOnly'){
        $(cardNode).find('.name, .colon').css('display','none');
      }else if($(this).val()==='nameOnly'){
        $(cardNode).find('.colon, .definition').css('display','none');
      }

      //for ability display
      if($(this).val()==='special'){
        $(parent).find('input[name="cost"]').parent().css('display','none');
      } else if($(this).val()==='definitionOnly'){
        $(parent).find('input[name="name"],input[name="cost"]').parent().css('display','none');
      } else if($(this).val()==='nameOnly'){
        $(parent).find('input[name="cost"],textarea[name="definition"]').parent().css('display','none');
      }
    });
  };


  /**
   *Passthrough method that calls checkKeywords on the keyword store.
   *@tdo Move to keywordStore
   */
  this.checkKeywords = function(){
    var card = this.closest(Card);
    this.closest(KeywordStore).checkKeywords(card.find('.front'));
  };
}

Form.prototype = new CoreTemplate('html/form/Form.html');
Form.prototype.constructor = Form;
