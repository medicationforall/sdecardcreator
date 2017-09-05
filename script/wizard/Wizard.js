/**
 *   SDE Card Creator source file Wizard,
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

function Wizard(){
  //data
  this.node=undefined;
  this.wizard=undefined;
  this.content=undefined;
  this.note=undefined;
  this.step=undefined;
  this.stepCount=undefined;
  this.steps=undefined;


  /**
   *
   */
  this._construct=function(){
    this._resolveTemplate();
  };

  /**
   *
   */
  this._setup=function(template){
    //console.log(template);
    this.node = $(template).insertBefore('.pageHeader');

    this.wizard = $('.wizard');
    this.content = $('.wizard .content');
    this.note = $('.wizard .note');
    this.step = 0;
    this.stepCount = 7;

    this.steps = [];

    this.buildStepsBase();
  };


  /**
   *
   */
  this.buildStepsBase=function(){
    this.steps= [];

    this.steps.push(this.startStep);
    this.steps.push(this.selectCardStep);
  };


  /**
   *
   */
  this.buildXSteps=function(type){
    var map = {};
    map.hero = this.buildHeroSteps;
    map.monster = this.buildMonsterSteps;
    map.pet = this.buildPetSteps;
    map.loot = this.buildLootSteps;
    map.treasure = this.buildTreasureSteps;

    $.proxy(map[type],this)();
  };


  /**
   *
   */
  this.buildHeaderSteps=function(){
    this.steps.push(this.titleStep);
    this.steps.push(this.subTitleStep);
  };


  /**
   *
   */
  this.buildHeroSteps=function(){
    this.buildStepsBase();
    this.buildHeaderSteps();
    this.steps.push(this.movementStep);
    this.steps.push(this.actionStep);
    this.steps.push(this.backgroundStep);

    this.steps.push(this.endStep);
  };


  /**
   *
   */
  this.buildMonsterSteps=function(){
    this.buildStepsBase();
    this.steps.push(this.buildMonsterColor);
    this.buildHeaderSteps();
    this.steps.push(this.movementStep);
    this.steps.push(this.actionStep);
    this.steps.push(this.backgroundStep);

    this.steps.push(this.monsterBitStep);
    this.steps.push(this.endStep);
  };


  /**
   *
   */
  this.buildPetSteps=function(){
    this.buildStepsBase();
    this.buildHeaderSteps();
    this.steps.push(this.movementStep);
    this.steps.push(this.actionStep);
    this.steps.push(this.backgroundStep);

    this.steps.push(this.endStep);
  };


  /**
   *
   */
  this.buildTreasureSteps=function(){
    this.buildStepsBase();
    this.buildHeaderSteps();
    this.steps.push(this.endStep);
  };


  /**
   *
   */
  this.buildLootSteps=function(){
    this.buildStepsBase();
    this.buildHeaderSteps();
    this.steps.push(this.endStep);
  };


  /**
   *
   */
  this.previousStep=function(){
    if(this.step !== 0){
      this.step--;
    }
    this.callStep(this.step);
  };


  /**
   *
   */
  this.nextStep=function(){
    if(this.step < this.steps.length-1){
      this.step++;
    }
    this.callStep(this.step);
  };


  /**
   *
   */
  this.callStep=function callStep(i){
    this.reset();

    if(this.steps[i]){
      $.proxy(this.steps[i],this)(i);
    }
  };


  /**
   *
   */
  this.startStep=function(i){
    $(this.wizard).find('.text').html('I\'m a Helpful wizard! <br />Click the next button.');
    this.setNote('Trying to break the wizard already ?');
  };


  /**
   *
   */
  this.selectCardStep=function(i){
    var that = this;

    //content
    this.setText(i+' - Select a Card Type.');
    this.setContent('What kind of card would you like to make?');

    $(this.content).append('<div>'+
    '<input type="radio" name="wCardType" value="hero">Hero<br>'+
    '<input type="radio" name="wCardType" value="monster">Monster<br>'+
    '<input type="radio" name="wCardType" value="pet">Pet<br>'+
    '<input type="radio" name="wCardType" value="loot">Loot - not working<br>'+
    '<input type="radio" name="wCardType" value="treasure">Treature - not working'+
    '</div>');

    //initialize
    $(this.wizard).find('input[name=wCardType][value='+$('.form select[name=cardType]').val()+']').attr('checked','checked');
    that.buildXSteps($('.form select[name=cardType]').val());

    //setup handler
    $(this.wizard).find('input[name=wCardType]').click(function(event){
      $('.form select[name=cardType]').val($(this).val()).trigger('change');
      that.buildXSteps($(this).val());
    });
  };


  /**
   *
   */
  this.endStep=function(i){
    this.setText('The End');
    this.setContent('Making Wizards is tough! - I\'m afraid any further adventuring will have to be done by you. for now..');
  };


  /**
   *
   */
  this.titleStep=function(i){
    //content
    this.setText(i+' - Give your card a Title.');
    this.setContent('What is your '+this.getType()+'\'s Name?');
    $(this.content).append('<div>'+
    '<input name="wTitle" />'+
    '</div>');

    //initialize
    $(this.wizard).find('input[name=wTitle]').val($('.form input[name=title]').val());

    //setup handler
    $(this.wizard).find('input[name=wTitle]').on('input',function(event){
      $('.form input[name=title]').val($(this).val()).trigger('input');
    });
  };


  /**
   *
   */
  this.subTitleStep=function(i){
    //content
    this.setText(i+' - Give your card a Sub-Title.');
    this.setContent('Something catchy to describe your '+this.getType()+'. Like "Elf Hero" or "Undead Mini Boss"');
    $(this.content).append('<div>'+
    '<input name="wSubTitle" />'+
    '</div>');

    //initialize
    $(this.wizard).find('input[name=wSubTitle]').val($('.form input[name=subTitle]').val());

    //setup handler
    $(this.wizard).find('input[name=wSubTitle]').on('input',function(event){
      $('.form input[name=subTitle]').val($(this).val()).trigger('input');
    });
  };


  /**
   *
   */
  this.movementStep=function(i){
    //content
    this.setText(i+' - Set Movement Points.');
    this.setContent('How Fast is your '+this.getType()+' - 5 is pretty slow, 7 is quick');
    $(this.content).append('<div>'+
    '<input name="wMove" type="number" />'+
    '</div>');

    //initialize
    $(this.wizard).find('input[name=wMove]').val($('.form input[name=move]').val());

    //setup handler
    $(this.wizard).find('input[name=wMove]').on('input',function(event){
      $('.form input[name=move]').val($(this).val()).trigger('input');
    });
  };


  /**
   *
   */
  this.actionStep=function(i){
    //content
    this.setText(i+' - Set Action Points.');
    this.setContent('How Many Action points does your '+this.getType()+' have?  For a hero 3 is common. For a minion 1 or 2 is normal.');
    $(this.content).append('<div>'+
    '<input name="wActions" type="number" />'+
    '</div>');

    //initialize
    $(this.wizard).find('input[name=wActions]').val($('.form input[name=actions]').val());

    //setup handler
    $(this.wizard).find('input[name=wActions]').on('input',function(event){
      $('.form input[name=actions]').val($(this).val()).trigger('input');
    });
  };


  /**
   *
   */
  this.backgroundStep=function(i){
    //content
    this.setText(i+' - Select a Background Image.');
    this.setContent('');

    $(this.content).append('<div>'+
    '<input type="radio" name="wBackground" value="pic1685577_md.jpg">Fae Wood<br>'+
    '<input type="radio" name="wBackground" value="character-background.png">Nether<br>'+
    '<input type="radio" name="wBackground" value="f8ebe365c206a57065d4970fb91b5d78.jpg">Pirates Cove<br>'+
    '<input type="radio" name="wBackground" value="valley.jpg">Valley<br>'+
    '</div>');

    //initialize
    $(this.wizard).find('input[name=wBackground][value="'+$('.form select[name=background]').val()+'"]').attr('checked','checked');

    //setup handler
    $(this.wizard).find('input[name=wBackground]').click(function(event){
    $('.form select[name=background]').val($(this).val()).trigger('change');
    });
  };


  /**
   *
   */
  this.backgroundFlipStep=function(i){
    //content
    this.setText(i+' - Mirror Background Image?');
    this.setContent('Leave the background Image as is, or would you like to mirror it?');

    $(this.content).append('<div>'+
    '<input type="checkbox" name="wFlip" />'+
    '</div>');

    //finish

    //initialize
    $(this.wizard);
  };


  /**
   *
   */
  this.buildMonsterColor=function(i){
    //content
    this.setText(i+' - Set your '+this.getType()+'\'s Region');
    this.setContent(' What... is your favourite colour?');

    var region = $(this.content).append('<div class="regions"></div>');

    $('.form select[name=region]').find('option').each(function(){
      console.log($(this).val());
      $(region).append('<input type="radio" name="wRegion" value="'+$(this).val()+'" />'+$(this).text()+'<br />');
    });

    //initialize
    $(this.wizard).find('input[name=wRegion][value="'+$('.form select[name=region]').val()+'"]').attr('checked','checked');

    //setup handler
    $(this.wizard).find('input[name=wRegion]').click(function(event){
      $('.form select[name=region]').val($(this).val()).trigger('change');
    });
  };


  /**
   *
   */
  this.monsterBitStep=function(i){
    //content
    this.setText(i+' - Set your '+this.getType()+'\'s bit');
    this.setContent('Weak monsters are 8bit and a Boss would be SUPER.');

    var bits = $(this.content).append('<div class="bits"></div>');

    $('.form .bit').find('option').each(function(){
      $(bits).append('<input type="radio" name="wBit" value="'+$(this).val()+'" />'+$(this).text()+'<br />');
    });

    //iniatialize
    $(this.wizard).find('input[name=wBit][value="'+$('.form select[name=bit]').val()+'"]').attr('checked','checked');

    //setup handler
    $(this.wizard).find('input[name=wBit]').click(function(event){
      $('.form select[name=bit]').val($(this).val()).trigger('change');
    });
  };


  /**
   *
   */
  this.reset=function(){
    this.setText("");
    this.setContent("");
    this.setNote("");
  };


  /**
   *
   */
  this.setText=function(text){
    $(this.wizard).find('.text').text(text);
  };


  /**
   *
   */
  this.setContent=function(text){
    $(this.wizard).find('.content').text(text);
  };


  /**
   *
   */
  this.setNote=function(text){
    $(this.wizard).find('.note').text(text).hide().slideDown();
  };


  /**
   *
   */
  this.getType=function(){
    return $('.form select[name=cardType]').val();
  };


  //Main
  this._construct();
}

/**
 * Get the html template and store it in a static template variable.
 * @private
*/
Wizard.prototype._resolveTemplate=function(){
  if(Wizard.template){
    //console.log('template exists');
    this._setup(Wizard.template);

  }else{
    //console.log('template does not exist');
    return $.get('html/wizard.html',$.proxy(function(data){
    Wizard.template=data;

    if(this._setup){
    this._setup(Wizard.template);
    }
    },this));
  }
};
