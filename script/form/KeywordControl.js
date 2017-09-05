/**
 *   SDE Card Creator source file KeywordControl,
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
function KeywordControl(){

  /**
   *
   */
  this.init=function(){
    this.add(new KeywordSettings(this.closest(KeywordStore)));
  };


  /**
   *
   */
  this.setup=function(){
    this.node = $(KeywordControl.template).appendTo(this.parent.node);
    this.each('setup');
  };


  /**
   *
   */
  this.register=function(){
    this.setupKeywords();
    this.setupKeywordSettings();
    //this.setupKeywordDefinitionCheck();
    this.each('register');
  };


  /**
   *
   */
  this.setupKeywords=function(){
    var form = this.closest(Form);
    this.node.find("select[name=affinity]").change($.proxy(function(control,event){
      var card = control.closest(Card);
      card.setAffinity($(this).val());
    },undefined,this));

    form.linkToTemplate("keywordsList",'input',form.findKeywords,form.checkKeywords);
  };


  /**
   *@todo asynchronous timing issues.
   */
  this.setupKeywordSettings=function(){
    $('.form .keywordSettings').click(function(event){
      event.preventDefault();
      console.log('show Settings');
      this.showSettings();
    }.bind(this));
  };

  /**
   *
   */
  this.showSettings=function(){
    var keywordSettings = this.find(KeywordSettings);
    //set the controls state
    keywordSettings.setupList();
    keywordSettings.reset();

    //display the dialog @todo convert this a standard dialog.
    $('.keyword.settings').dialog({dialogClass: "keywordSettingsDialog", width: 500});
  };


  /**
   *@todo I don't know what this is used for if anything.
   */
  /*this.setupKeywordDefinitionCheck=function(){
    $('.form input[name="keywordDefinitionCheck"]').change(function(event){
      $('.form').trigger('checkKeywords');
    });
  }*/
}

KeywordControl.prototype = new CoreTemplate('html/form/KeywordControl.html');
KeywordControl.prototype.constructor = KeywordControl;
