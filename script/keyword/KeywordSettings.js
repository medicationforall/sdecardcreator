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
  this.template='	<div class="keyword settings" title="Keyword Editor">'+
  		'<div class="keywordList">'+
  			'<ul></ul>'+
  		'</div>'+
  		'<div class="keywordForm">'+
  			'<div>Name <input name="kName" maxlength="50" /></div>'+
  			'<div>Display Full Description on Card<input type="checkbox" name="kDisplayBack" checked="checked" /></div>'+
  			'<div>Version <select name="eVersion"><option class="iniatial">1.0</option></select> <a href="" class="addErrata" title="Add New Errata Version">+</a></div>'+
  			'<div>Description<br /><textarea name="kDescription" maxlength="1000"></textarea></div>'+
  			'<div class="buttons"><a href="" class="kSave">Update</a></div>'+
  		'</div>'+
  	'</div>';

  this.selectedKey=undefined;
  this.store=undefined;


  /**
   *
   */
  this._constructor=function(){
    this.store = store;
    this.setup();
    this.register();
  };


  /**
   *
   */
  this.setup=function(){
    this.node = $(this.template).insertAfter('.pageContent');
    this.node.data('node',this);
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
    this.node.find('.keywordList ul').empty();
    for(var i=0,key;(key=this.store.ordered[i]);i++){
      var selectedClass= '';
      if(selected && selected === key.toUpperCase()){
        selectedClass='selected';
        this.selectedKey = key;
      }
      this.node.find('.keywordList ul').append('<li><a href="" class="keyword '+selectedClass+'">'+key+'</a></li>');
    }
  };


  /**
   *
   */
  this._setupKeyClick=function(){

    this.node.find('.keywordList ul').on('click','a',$.proxy(function(coreNode,event){
      event.preventDefault();

      coreNode.node.find('.keywordList ul .selected').removeClass('selected');
      $(this).addClass('selected');

      coreNode.selectedKey = $(this).text();
      coreNode.fillOutForm($(this).text());
    },null,this));
  };


  /**
   *
   */
  this._setupSaveClick=function(){
    this.node.find('input[name="kName"]').removeClass('fail');
    this.node.find('.kSave').click(function(event){
      event.preventDefault();
      var name = this.node.find('input[name="kName"]').val().trim();

      if(name!==''){
        //create data object off of the form
        var data = this.gatherData();

        //set the data object to the store
        this.store.setCustomKey(data);

        this.store.checkKeywords($('.cardGroup.selected .front'));

        //update list
        this.setupList(name);
      }else{
        this.node.find('input[name="kName"]').addClass('fail');
      }
    }.bind(this));
  };


  /**
   *
   */
  this.gatherData=function(){
    var data={};
    data.name= this.node.find('input[name="kName"]').val();
    data.version = this.node.find('select[name="eVersion"] option').first().val();

    var exists = this.store.data[data.name]!==undefined;

    //correctly resolve
    if(exists){
      data.description= this.store.data[data.name].description;
    }else{
      data.description="";
    }

    data.selectedVersion =  this.node.find('select[name="eVersion"]').val();
    data.displayBack = this.node.find('input[name="kDisplayBack"]').is(':checked');

    var count = this.node.find('select[name="eVersion"] option').length;
    if(count>1){
      data.hasErrata=true;
      //console.log(' data has errata');
      var skip = true;
      data.errata=[];

      this.node.find('select[name="eVersion"] option').each(function(index,node){
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
            errata.description = this.node.find('textarea[name="kDescription"]').val();
          }
        }
      });
    }else{
      data.hasErrata=false;
    }

    //apply custom description
    if(data.version===data.selectedVersion){
      data.description = this.node.find('textarea[name="kDescription"]').val();
    }

    return data;
  };


  /**
   *
   */
  this._setupVersionChange=function(){
    var that = this;
    this.node.find('select[name="eVersion"]').change($.proxy(function(coreNode,event){
      //console.log('version change');
      coreNode.fillOutDescription(coreNode.selectedKey,$(this).val());
    },null,this));
  };


  /**
   *
   */
  this._setupAddErrataClick=function(){
    this.node.find('.keywordForm .addErrata').click($.proxy(function(coreNode,event){
      event.preventDefault();
      var version = parseFloat(coreNode.find('.keywordForm select[name="eVersion"]').last().val());
      version+=1;

      //console.log('clicked add errata',version);
      coreNode.find('.keywordForm select[name="eVersion"]').append('<option>'+version+'</option>').val(version).trigger('change');
    },null,this));
  };


  /**
   *
   */
  this.fillOutForm=function(key){
    var data = this.store.data[key];

    //console.log('fill out form',data);
    this.node.find('.keywordForm input[name="kName"]').removeClass('fail').val(key);
    this.node.find('.keywordForm textarea[name="kDescription"]').val(data.description);

    //set display back
    if(data.displayBack=== undefined || data.displayBack==='true'){
      data.displayBack=true;
    } else if(data.displayBack=== 'false'){
      data.displayBack=false;
    }

    this.node.find('.keywordForm input[name="kDisplayBack"]').prop('checked',data.displayBack);


    //set initial version
    this.node.find('.keywordForm select[name="eVersion"]').empty().append('<option class="initial">'+data.version+'</option>').val(data.version);
    //throw in errata
    if(data.hasErrata===true || data.hasErrata==='true'){
      for(var i=0,e;(e=data.errata[i]);i++){
        this.node.find('.keywordForm select[name="eVersion"]').append('<option>'+e.version+'</option>').val(e.version);
        this.node.find('.keywordForm textarea[name="kDescription"]').val(e.description);
      }
    }

    //resolve selected version
    if(data.selectedVersion){
      this.node.find('.keywordForm select[name="eVersion"]').val(data.selectedVersion).trigger('change');
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

    this.node.find('.keywordForm textarea[name="kDescription"]').val(description);
  };


  /**
   *
   */
  this.reset=function(){
    this.node.find('.keywordForm input[name="kName"]').removeClass('fail').val('');
    this.node.find('.keywordForm input[name="kDisplayBack"]').prop('checked',true);
    this.node.find('.keywordForm select[name="eVersion"]').empty().append('<option class="initial">2</option>').val('2');
    this.node.find('.keywordForm textarea[name="kDescription"]').val('');
  };


  //MAIN
  this._constructor();
}
