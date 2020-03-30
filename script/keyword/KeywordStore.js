/**
 *   SDE Card Creator source file KeywordStore,
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
 * Keyword Store
 * @class
 */
function KeywordStore(keywords){
  Core.call(this);
  //DATA
  this.data=undefined;
  this.ordered=undefined;
  this.byLength=undefined;
  this.lookup=undefined;
  this.re=undefined;
  this.reN=undefined;
  this.customKeywords=undefined;

  //CONSTRUCTOR
  /**
   * Initializes the store.
   */
  this._constuctor = function(){
    //this._getData();
    this.customKeywords = {};
    this._setup(keywords);
  };

  /**
   * Setup the store.
   * @param {object} data - Keyword data.
   */
  this._setup=function(data){
    this.data = data;

    var raw = [];
    var rawOrder = [];
    this.lookup = {};

    //loop though data keys
    for(var key in data){
      if(data.hasOwnProperty(key)){
        raw.push(key);
        rawOrder.push(key);
        this.lookup[key.toLowerCase()]=key;
      }
    }

    this.ordered = rawOrder.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    this.byLength = raw.sort(function(a, b){
      return b.length - a.length; // ASC -> a - b; DESC -> b - a
    });

    this.setupRegularExpression();
  };


  /**
   * Setup regular expressions.
   */
  this.setupRegularExpression=function(){
    var reText = '';
    var reXText = '';

    var re = /(\b\w+\s?\w+\b) \bX\b/;

    for(var i=0,key;(key = this.byLength[i]);i++){
      var results = re.exec(key);

      //check to see if X variable is involved
      if(results){
        reXText+=results[1];
        reXText+='|';
      }else{
        reText+=key;
        reText+='|';
      }
    }

    reXText = reXText.slice(0,-1);
    reText = reText.slice(0,-1);

    //console.log(reText);
    //console.log('\\b('+reText+')\\b','gi');
    this.re = new RegExp('\\b('+reText+')\\b','gi');
    //console.log('\\b('+reXText+')\\b \\b\\d+\\b');
    this.reN = new RegExp('\\b('+reXText+')\\b \\b(\\d+)\\b','gi');
  };


  /**
   *search function that returns a modified version of the text passed into with the keywords highlighted.
   */
  this.findKeywords=function(text){
    text = text.replace(this.re,function(match){
      var key = this.lookup[match.toLowerCase()];
      var keyClass = this.resolveKeyClass(key);
      return '<span class="keyword '+keyClass+'" data-key="'+key+'">'+key+'</span>';
    }.bind(this));
    return text;
  };


  /**
   * Find keywords that can contain other keywords.
   */
  this.findNKeywords=function(text){
    text = text.replace(this.reN,function(match,key,number){
      //console.log('findNKeywords',match,arguments);
      var dataKey = this.resolveNKey(key);
      var keyClass = this.resolveKeyClass(key);

      return '<span class="keyword '+keyClass+'" data-key="'+dataKey+'">'+key+' '+number+'</span>';
    }.bind(this));
    return text;
  };


  /**
   *
   */
  this.resolveNKey=function(key){
    key = this.ucFirstAllWords(key)+' X';
    return key;
  };


  /**
   *http://stackoverflow.com/a/8330107
   */
  this.ucFirstAllWords=function(str){
    str = str.toLowerCase();
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ ) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
  };


  /**
   *
   */
  this.addKeyword=function(key,data){
    var lKey = key.toLowerCase();
    var keyClass = this.resolveKeyClass(key);

    //check to see if the keyword is already added, and if the display flag does not equal false
    if( data.displayBack !== false && data.displayBack !== 'false'  && $('.cardGroup.selected .card .keywords .'+keyClass).length ===0){
      //console.log(key,data);

      var description = data.description;

      if(data.selectedVersion !== undefined){
        if(data.selectedVersion !== data.version ){
          for(var i=0,e;(e=data.errata[i]);i++){
            if(data.selectedVersion === e.version.toString()){
              description=e.description;
              break;
            }
          }
        }
      }else if(data.hasErrata === "true" || data.hasErrata === true){
        description = data.errata[data.errata.length-1].description;
      }

      var parsedDescription = this.parseDescription(description);

      var backTemplate = '<div class="keyword '+keyClass+'" data-key="'+key+'">'+
      '<span class="keyword '+keyClass+'"></span>'+
      '<span class="name">'+key+'</span>:'+
      '<span class="description">'+parsedDescription+'</span>'+
      '</div>';

      var itemTemplate = '<div class="keyword '+keyClass+'" data-key="'+key+'">'+
      '<span class="keyword '+keyClass+'"></span>'+
      '<span class="name">'+key+'</span> '+
      '<span class="description">('+parsedDescription+')</span>'+
      '</div>';

      $(".cardGroup.selected .card .back .keywords").append(backTemplate);

      $(".cardGroup.selected .card .item .keywords").append(itemTemplate);
    }
  };


  /**
   *
   */
  this.parseDescription=function(description){
    var affinityDescription = this.findAffinity(description);
    var diceDescription = this.findDice(affinityDescription);
    var statSescription = this.findStats(diceDescription);
    return statSescription;
  };


  /**
   *
   */
  this.findStats=function(text){
    var re = /\b(str|will|dex|arm)\b/gi;
    text = text.replace(re,'<span class="stat $1">$1</span>');
    return text;
  };

  /**
   *
   */
  this.findDice=function(text){
    //regular expression - https://regex101.com/#javascript
    var re = /(([+-]?[0-9]+)(rg|[rbgop]|st|sw|mi|ma|ac|mo|he|sh))\b/gi;

    text = text.replace(re,function(match,p1,p2,p3,p4){
      var c="";
      var v = p3.toLowerCase();

      if(v==='r'){
        c+="dice red";
      }else if(v==='b'){
        c+="dice blue";
      }else if(v==='g'){
        c+="dice green";
      }else if(v==='o'){
        c+="dice orange";
      }else if(v==='p'){
        c+="dice purple";
      }else if(v==='st'){
        c+="dice star";
      }else if(v==='ma'){
        c+="offense magic";
      }else if(v==='mi'){
        c+="offense missile";
      }else if(v==='sw'){
        c+="offense melee";
      }else if(v==='rg'){
        c+="offense range";
      }else if(v==='ac'){
        c+="actionMod";
      }else if(v==='mo'){
        c+="moveMod";
      }else if(v==='he'){
        c+="heartMod";
      }else if(v==='sh'){
        c+="shieldMod";
      }
      return '<span class="'+c+'">'+(p2==='0'?'&nbsp;':p2)+'</span>';
    });
    return text;
  };


  /**
   *
   */
  this.findAffinity=function(description){
    var re = /\b(Sapphire|Emerald|Citrine|Ruby|Amethyst)\b/gi;

    description = description.replace(re,function(match){
    return '<div class="affinity '+match.toLowerCase()+'" title="'+match+'"></div>';
    });
    return description;
  };


  /**
   *
   */
  this.resolveKeyClass=function(key){
    var parts = key.split(' ');
    var returner ='';

    for(var i=0,item;(item=parts[i]);i++){
      if(i==0){
        item = item.toLowerCase();
        item = item.replace('\'','');

        if($.isNumeric(item[0])){
          item="key-"+item;
        }
      }

      returner+=item;
    }
    return returner;
  };


  /**
   *
   */
  this.split=function(val){
    return val.split( /,\s*/ );
  };


  /**
   *
   */
  this.extractLast=function(term){
    return this.split(term).pop();
  };


  /**
   *
   */
  this.setupKeywordsForm=function(){
    var that = this;
    $('.form input[name=keywordsList]').autocomplete({
      minLength: 0,
      source: function( request, response ) {
      // delegate back to autocomplete, but extract the last term
      response( $.ui.autocomplete.filter(this.ordered, this.extractLast( request.term ) ) );
      }.bind(this),
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
      var terms = that.split( this.value );
      // remove the current input
      terms.pop();
      // add the selected item
      terms.push( ui.item.value );
      // add placeholder to get the comma-and-space at the end
      terms.push( "" );
      this.value = terms.join( ", " );
      $('.form input[name=keywordsList]').trigger('input');
        return false;
      }
    });
  };


  /**
   *
   */
  this.checkKeywords=function(node){
    var keysFound = [];
    //clear keywords
    $('.cardGroup.selected .card .keywords').empty();

    $(node).find('.keyword').each(function(index, element){
      keysFound.push($(element).data('key'));
    });

    //sort keysfound - should be case insensitive
    keysFound = keysFound.sort(function(a,b){
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    //loop through keysfound
    for(var i=0,key;(key=keysFound[i]);i++){
      this.addKeyword(key,this.data[key]);
    }
  };


  /**
   * params: name, description, version, hasErrata, displayBack
   */
  this.setCustomKey=function(p){
    if(this.data.hasOwnProperty(p.name)===false){
      this.data[p.name]={};
      this.data[p.name].errata=[];
    }

    if(p.hasErrata){
      //console.log('has errata');
      this.data[p.name].errata = p.errata;
    }else{
      p.hasErrata = false;
    }

    if(p.hasOwnProperty('displayBack')===false){
      p.displayBack = true;
    }

    if(p.hasOwnProperty('selectedVersion')){
      this.data[p.name].selectedVersion=p.selectedVersion;
    }

    this.data[p.name].description = p.description;
    this.data[p.name].version = p.version;
    this.data[p.name].hasErrata = p.hasErrata;
    this.data[p.name].displayBack = p.displayBack;

    //setup Custom keyword
    this.customKeywords[p.name] = this.data[p.name];

    this._setup(this.data);
  };


  /**
   *
   */
  this.setCustomKeywords=function(customKeywords){
    this.customKeywords = customKeywords;

    for(var key in customKeywords){
      if(customKeywords.hasOwnProperty(key)){
        this.data[key]= customKeywords[key];
      }
    }

    this._setup(this.data);
    //this.checkKeywords();
  };


  //main
  this._constuctor();
}

KeywordStore.prototype = new Core();
KeywordStore.prototype.constructor = KeywordStore;
