/**
 *   SDE Card Creator source file SdeCreate,
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
 *
 */
function SdeCreate(){
  console.log('instantiate SDECreate');

  //constructor
  /**
   *
   */
  this.init=function(){
    this.add(new KeywordStore());
    this.add(new Form());
    this.add(new Card());
    this.each('init');
  };

  /**
   *
   */
  this.register=function(){
    this.setupHelpButton();
    this.setupAddCard();
    this.each('register');
  };

  /**
   *@todo move to form
   */
  this.setupHelpButton=function(){
    $('.form .helpButton').click(function(event){
      event.preventDefault();
      $(this).closest('div').find('.helpBlock').toggle();
      //$('.form .statHelpBlock').toggle();
    });
  };

  /**
   *
   */
  this.setupAddCard=function(){
    $('.addCard').click($.proxy(function(sdeCreate,event){
      event.preventDefault();
      console.log('clicked add card');
      sdeCreate.addCard();
    },undefined,this));
  };

  /**
   *
   */
  this.addCard=function(){
    var form = this.closest(Form);
    var card = this.prepend(new Card());
    card.load();
    card.setup();
    card.register();
    card.node.detach().insertAfter(form.node);
  };


  /**
   *Returns a data object containing all of the form data to represent the card.
   */
  this.gatherData=function(){
    var data = {};

    this.getData(data,'select','cardType');
    this.getData(data,'select','region');
    this.getData(data,'select','orientation');
    this.getData(data,'input','title');
    this.getData(data,'input','subTitle');
    this.getData(data,'input','move');
    this.getData(data,'input','actions');
    this.getData(data,'input','potions');
    this.getData(data,'input','wounds');
    this.getData(data,'input','skulls');
    this.getData(data,'input','keywordsList');
    this.getData(data,'select','background');
    this.getData(data,'input','backgroundFlip',true);

    //save image selection type
    data.imageSource = $('.form input[name=imageSource]:checked').val();
    data.remoteAvatar = $("input[name=rCharacter]").val();

    if(data.imageSource === 'local'){
      data.avatarData = $(".card .front .character").attr('src');
    }

    this.getData(data,'input','creepSpawn');

    this.getData(data,'input','STR');
    this.getData(data,'input','ARM');
    this.getData(data,'input','WILL');
    this.getData(data,'input','DEX');
    this.getData(data,'input','itemStats');

    this.getData(data,'select','bit');
    this.getData(data,'textarea','flavorText');

    data.abilities = [];

    $('.form .ability').each(function(){
      var ability = {};
      ability.costType=$(this).find('select[name="costType"]').val();
      ability.cost=$(this).find('input[name="cost"]').val();
      ability.name=$(this).find('input[name="name"]').val();
      ability.definition=$(this).find('textarea[name="definition"]').val();
      data.abilities.push(ability);
    });

    if(this.keywordStore.customKeywords !==undefined){
      data.customKeywords = this.keywordStore.customKeywords;
    }

    this.getData(data,'select','affinity');
    //console.log(data);

    return data;
  };


  /**
   *Collects the data for a single form field if the css display propery is not none.
   *Also checks 2 parent levels up for the display property.
   *If it's determined to be visible the object is add to the data object.
   */
  this.getData=function(data,type,name,checkbox){
    var node = $('.form '+type+'[name="'+name+'"]');

    if(node.css('display')==='none' || node.parent().css('display')==='none' || node.parent().parent().css('display')=== 'none'){
      return;
    }

    if(checkbox){
      data[name] = node.is(':checked');
    }else{
      data[name] = node.val();
    }
  };


  /**
   *
   */
  this.setData=function(data){
    //console.log('calling form setData',data);
    $('.form form').trigger('reset');

    if(data.customKeywords !== undefined){
      this.keywordStore.setCustomKeywords(data.customKeywords);
    }

    $("select[name=cardType]").val(data.cardType).trigger('change');

    if(data.region){
      $("select[name=region]").val(data.region).trigger('change');
    }

    if(data.orientation){
      $('select[name="orientation"]').val(data.orientation).trigger('change');
    }

    $("input[name=title]").val(data.title).removeClass('fail').trigger('input');
    $("input[name=subTitle]").val(data.subTitle).trigger('input');

    $("input[name=move]").val(data.move).trigger('input');
    $("input[name=actions]").val(data.actions).trigger('input');
    $("input[name=potions]").val(data.potions).trigger('input');
    $("input[name=wounds]").val(data.wounds).trigger('input');
    $("input[name=skulls]").val(data.skulls).trigger('input');

    $("input[name=keywordsList]").val(data.keywordsList);
    if(data.keywordsList){
      $("span.keywordsList").html(this.findKeywords(data.keywordsList));
    }
    this.checkKeywords();


    //BACKGROUND
    $("select[name=background]").val(data.background).trigger('change');
    $("input[name=backgroundFlip]").prop('checked',data.backgroundFlip).trigger('change');


    //IMAGE
    //order matters kids!
    $("input[name=rCharacter]").val(data.remoteAvatar).trigger('input');

    if(data.imageSource === undefined){
      data.imageSource = 'default';
    }

    //set radio button
    //console.log(data.imageSource,$("input[name=imageSource][value="+data.imageSource+"]").is(':checked'));
    if($("input[name=imageSource][value="+data.imageSource+"]").is(':checked')===false){
      $("input[name=imageSource][value="+data.imageSource+"]").prop('checked',true).trigger('change');
    }

    //todo fix character image load
    if(data.imageSource==='local' && data.avatarData){
      $(".card .front .character").attr('src',data.avatarData);
    } else if(data.imageSource==='default'){
      this.setProfileDefaultAvatar();
    }

    if(data.creepSpawn){
      $('input[name="creepSpawn"]').val(data.creepSpawn).trigger('input');
    }

    //STATS
    $("input[name=STR]").val(data.STR).trigger('input');
    $("input[name=ARM]").val(data.ARM).trigger('input');
    $("input[name=WILL]").val(data.WILL).trigger('input');
    $("input[name=DEX]").val(data.DEX).trigger('input');
    $('input[name=itemStats]').val(data.itemStats).trigger('input');

    $("select[name=bit]").val(data.bit).trigger('change');

    $("textarea[name=flavorText]").val(data.flavorText).trigger('input');

    $("select[name=affinity]").val(data.affinity).trigger('change');

    //ABILITIES
    for(var i=0;i<data.abilities.length;i++){
      var ability = new Ability();
      var formNode = this.setupAbility(ability);

      $(formNode).find("select[name=costType]").val(data.abilities[i].costType).trigger('change');
      $(formNode).find("input[name=cost]").val(data.abilities[i].cost).trigger('input');
      $(formNode).find("input[name=name]").val(data.abilities[i].name).trigger('input');
      $(formNode).find("textarea[name=definition]").val(data.abilities[i].definition).trigger('input');
    }
  };


  /**
   *
   */
  this.reset=function(){
    //setTimeout(function() {
    $('.form .ability .closeAbility').trigger('click');
  };
}

SdeCreate.prototype = new Core();
SdeCreate.prototype.constructor = SdeCreate;
