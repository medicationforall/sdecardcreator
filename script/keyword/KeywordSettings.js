/**
 *   SDE Card Creator source file KeywordSettings,
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

function KeywordSettings(store){
  //DATA
  this.template=undefined;
  this.selectedKey=undefined;
  this.store=undefined;

  //CONSTRUCTOR
  this._constructor=function(){
    this.store = store;
    //this._resolveTemplate();
  };

  //METHODS
  this.setup=function(template){
    console.log('setting dialog setup');
    this.node = $(KeywordSettings.template).insertAfter('.pageContent');
  };

  this.register=function(){
    this.setupList();
    this._setupKeyClick();
    this._setupSaveClick();
    this._setupVersionChange();
    this._setupAddErrataClick();
  };

  /**
   *
   */
  this.setupList=function(selected){
    $('.keyword.settings .keywordList ul').empty();
    for(var i=0,key;(key=this.store.ordered[i]);i++){
      var selectedClass= '';
      if(selected && selected === key){
        selectedClass='selected';
        this.selectedKey = key;
      }
      $('.keyword.settings .keywordList ul').append('<li><a href="" class="keyword '+selectedClass+'">'+key+'</a></li>');
    }
  };


  /**
   *
   */
  this._setupKeyClick=function(){
    var that = this;

    $('.keyword.settings .keywordList ul').on('click','a',function(event){
    event.preventDefault();
    //console.log('clicked settings link');

    $('.keyword.settings .keywordList ul .selected').removeClass('selected');
      $(this).addClass('selected');

      that.selectedKey = $(this).text();
      that.fillOutForm($(this).text());
    });
  };


  /**
   *
   */
  this._setupSaveClick=function(){
    $('.keyword.settings input[name="kName"]').removeClass('fail');
    $('.keyword.settings .kSave').click(function(event){
      event.preventDefault();
      var name = $('.keyword.settings input[name="kName"]').val().trim();

      if(name!==''){
        //create data object off of the form
        var data = this.gatherData();

        //set the data object to the store
        this.store.setCustomKey(data);

        $('.form').trigger('checkKeywords');

        //update list
        this.setupList(name);
      }else{
        $('.keyword.settings input[name="kName"]').addClass('fail');
      }
    }.bind(this));
  };


  /**
   *
   */
  this.gatherData=function(){
    var data={};
    data.name= $('.keyword.settings input[name="kName"]').val();
    data.version = $('.keyword.settings select[name="eVersion"] option').first().val();

    var exists = this.store.data[data.name]!==undefined;

    //correctly resolve
    if(exists){
      data.description= this.store.data[data.name].description;
    }else{
      data.description="";
    }

    data.selectedVersion =  $('.keyword.settings select[name="eVersion"]').val();
    data.displayBack = $('.keyword.settings input[name="kDisplayBack"]').is(':checked');

    var count = $('.keyword.settings select[name="eVersion"] option').length;
    if(count>1){
      data.hasErrata=true;
      //console.log(' data has errata');
      var skip = true;
      data.errata=[];

      $('.keyword.settings select[name="eVersion"] option').each(function(index,node){
        if(skip){
          skip = false;
        }else{
          var errata = {};
          errata.version = parseFloat($(node).val());

          data.errata.push(errata);

          if(exists && this.store.data[data.name].errata[index-1]){
            errata.description =  this.store.data[data.name].errata[index-1].description;
          }else{
            errata.description="";
          }

          //apply custom description
          if($(node).val()===data.selectedVersion){
            errata.description = $('.keyword.settings textarea[name="kDescription"]').val();
          }
        }
      });
    }else{
      data.hasErrata=false;
    }

    //apply custom description
    if(data.version===data.selectedVersion){
      data.description = $('.keyword.settings textarea[name="kDescription"]').val();
    }

    return data;
  };


  /**
   *
   */
  this._setupVersionChange=function(){
    var that = this;
    $('.keyword.settings select[name="eVersion"]').change(function(event){
      //console.log('version change');
      that.fillOutDescription(that.selectedKey,$(this).val());
    });
  };


  /**
   *
   */
  this._setupAddErrataClick=function(){
    $('.keyword.settings .keywordForm .addErrata').click(function(event){
      event.preventDefault();
      var version = parseFloat($('.keyword.settings .keywordForm select[name="eVersion"]').last().val());
      version+=1;

      //console.log('clicked add errata',version);
      $('.keyword.settings .keywordForm select[name="eVersion"]').append('<option>'+version+'</option>').val(version).trigger('change');
    });
  };


  /**
   *
   */
  this.fillOutForm=function(key){
    var data = this.store.data[key];

    //console.log('fill out form',data);
    $('.keyword.settings .keywordForm input[name="kName"]').removeClass('fail').val(key);
    $('.keyword.settings .keywordForm textarea[name="kDescription"]').val(data.description);

    //set display back
    if(data.displayBack=== undefined || data.displayBack==='true'){
      data.displayBack=true;
    } else if(data.displayBack=== 'false'){
      data.displayBack=false;
    }

    $('.keyword.settings .keywordForm input[name="kDisplayBack"]').prop('checked',data.displayBack);


    //set initial version
    $('.keyword.settings .keywordForm select[name="eVersion"]').empty().append('<option class="initial">'+data.version+'</option>').val(data.version);
    //throw in errata
    if(data.hasErrata===true || data.hasErrata==='true'){
      for(var i=0,e;(e=data.errata[i]);i++){
        $('.keyword.settings .keywordForm select[name="eVersion"]').append('<option>'+e.version+'</option>').val(e.version);
        $('.keyword.settings .keywordForm textarea[name="kDescription"]').val(e.description);
      }
    }

    //resolve selected version
    if(data.selectedVersion){
      $('.keyword.settings .keywordForm select[name="eVersion"]').val(data.selectedVersion).trigger('change');
    }
  };


  /**
   *
   */
  this.fillOutDescription=function(key,selectedVersion){
    var data = this.store.data[key];
    var description ="";

    if(data){
      if(selectedVersion === data.version.toString()){
        description = data.description;
      }else{
        for(var i=0,e;(e=data.errata[i]);i++){
          if(selectedVersion===e.version.toString()){
            description = e.description;
            break;
          }
        }
      }
    }

    $('.keyword.settings .keywordForm textarea[name="kDescription"]').val(description);
  };


  /**
   *
   */
  this.reset=function(){
    $('.keyword.settings .keywordForm input[name="kName"]').removeClass('fail').val('');
    $('.keyword.settings .keywordForm input[name="kDisplayBack"]').prop('checked',true);
    $('.keyword.settings .keywordForm select[name="eVersion"]').empty().append('<option class="initial">2</option>').val('2');
    $('.keyword.settings .keywordForm textarea[name="kDescription"]').val('');
  };


  //MAIN
  this._constructor();
}

KeywordSettings.prototype = new CoreTemplate('html/keywordSettings.html');
KeywordSettings.prototype.constructor = KeywordSettings;
