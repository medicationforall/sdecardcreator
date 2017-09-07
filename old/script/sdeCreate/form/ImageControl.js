/**
 *   SDE Card Creator source file ImageControl,
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

function ImageControl(){

  /**
   *
   */
  this.setup=function(){
    this.node = $(ImageControl.template).appendTo(this.parent.node);
  };


  /**
   *
   */
  this.register=function(){
    this.setupBackground();
    this.setupBackgroundFlip();
    this.setupRadio();
    this.setupRemote();
    this.setupLocal();
    this.setupCreepSpawn();
  };


  /**
   *
   */
  this.setupBackground=function(){
    this.node.find("select[name=background]").change($.proxy(function(imc,event){
      var card = imc.closest(Card);
      card.setBackground("image/background/"+$(this).val());
    },undefined,this));

    //initilize background for card
    this.node.find("select[name=background]").trigger('change');
  };


  /**
   *
   */
  this.setupBackgroundFlip=function(){
    this.node.find("input[name=backgroundFlip]").change($.proxy(function(imc,event){
      var card = imc.closest(Card);
      card.setFlipped($(this).is(':checked'));
    },undefined,this));
  };


  /**
   *
   */
  this.setupRadio=function(){
    //setup radio
    this.node.find('input[name=imageSource]').change($.proxy(function(imc,event){
      //console.log($(this).val());
      var card = imc.closest(Card);
      var form = imc.closest(Form);
      var value = $(this).val();

      //reset creepSpawn span back to display none.
      card.node.find('.item .creepSpawn').css('display','');

      if(value === "default"){
        imc.setProfileDefaultAvatar(form.node.find("select[name=cardType]").val());
      } else if(value === "local"){
        imc.node.find("input[name=character]").trigger('change');
      } else if(value === "remote"){
        imc.node.find('input[name=rCharacter]').trigger('input');
      } else if(value === "creep"){
        card.setAvatar('image/creepSpawn.png');
        card.node.find('.item .creepSpawn').css('display','inline');
      }
    },undefined,this));
  };


  /**
   *
   */
  this.setupRemote=function(){
    this.node.find("input[name=rCharacter]").on('input',$.proxy(function(imc){
    var card = imc.closest(Card);
    //@todo verify that remote includes http:// or https://
    card.setAvatar($(this).val());
    imc.node.find('input[name=imageSource][value=remote]').attr('checked','checked');
    },undefined,this));
  };


  /**
   *
   */
  this.setupLocal=function(){
    this.node.find("input[name=character]").change($.proxy(function(imc,event){
    imc.readURL(this);
    imc.node.find('input[name=imageSource][value=local]').attr('checked','checked');
    },undefined,this));
  };


  /**
   *
   */
  this.setupCreepSpawn=function(){
    //console.log('setup creep spawn');
    var form = this.closest(Form);
    form.linkToTemplate("creepSpawn");
  };


  /**
   *
   */
  this.setProfileDefaultAvatar = function(v){
    if(this.node.find('input[name=imageSource][value=default]').is(':checked')){
    this.closest(Card).setDefaultAvatar(v);
    }
  };


  /**
   *
   */
  this.readURL = function(input){
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = $.proxy(function (imc,e) {
        imc.closest(Card).setAvatar(e.target.result);
      },undefined,this);
      reader.readAsDataURL(input.files[0]);
    }
  };
}

ImageControl.prototype = new CoreTemplate('html/form/ImageControl.html');
ImageControl.prototype.constructor = ImageControl;
