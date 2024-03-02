/**
 *   SDE Card Creator source file main,
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
 * Extension to jquery to apply a css animation class and remove it when the animation is finished.
 * @param {string} animationName - css class name to the added to the domnode.
 */
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


var languageChoice = "en";
function changeLanguage() {
	var previousLanguage = languageChoice;
	languageChoice = document.getElementById('languageSelection').value;
	
	changeLanguageFromTo(previousLanguage, languageChoice);
}

function changeLanguageFromTo(previousLanguage, nextLanguage) {
	updateKeywordLanguage();
	updateStatLanguage(previousLanguage, nextLanguage);
}

function updateStatLanguage(previousLanguage, nextLanguage) {
	var elements = document.getElementsByClassName(previousLanguage);
	var stat = 0;
	
	while(elements.length > 0) {
		var element = elements[0];
		element.classList.add('stat');
		element.classList.replace(previousLanguage, nextLanguage);		
		if(stat == 0) {
			element.classList.add('STR');
		} else if(stat == 1) {
			element.classList.add('ARM');
		} else if(stat == 2) {
			element.classList.add('WILL');
		} else if(stat == 3) {
			element.classList.add('DEX');
		}
		stat++;
	}
}

function updateKeywordLanguage() {
	stripStatsFromKeywords();
	
	applyLanguageToDefinitions();
	switchKeywordLanguages();
	applyLanguageToDescriptions();
}

function stripStatsFromKeywords() {
	stripFromKeywords('STR');
	stripFromKeywords('ARM');
	stripFromKeywords('WILL');
	stripFromKeywords('DEX');
}

function stripFromKeywords(stat) {
	var elements = document.getElementsByClassName(stat);
	while(elements.length > 0) {
		var element = elements[0];
		element.classList.remove('stat');
		element.classList.remove(stat);
	}
}

function applyLanguageToDefinitions() {
	var elements = document.getElementsByClassName('definition');
	for(var x=0; x < elements.length; x++) {
		var element = elements[x];
		
		var eValue = element.innerHTML;
		element.innerHTML = findStats(eValue);
		var test = "";
	}
}

function switchKeywordLanguages() {
	switchKeywordLanguageFile();
	clearKeywordDefinitions();
	reScanKeywords();
}

function switchKeywordLanguageFile() {
	var en = 'sde_keywords_english.json';
	var de = 'sde_keywords_deutch.json';
	var es = 'sde_keywords_espanol.json';
	var fr = 'sde_keywords_francais.json';

	if(languageChoice == "en") {
		re = en;
	} else if(languageChoice == "de") {
		re = de;
	} else if(languageChoice == "es") {
		re = es;
	} else if(languageChoice == "fr") {
		re = fr;
	} else {
		re = en;
	}
	
	var promises = [];
	promises.push($.getJSON('./json/'+re));	
	
	$.when.apply($, promises).done(function(keywords){
		var keywordStore = new KeywordStore(keywords);
		keywordStore.setupKeywordsForm();
		$('.page').data('keywordStore',keywordStore);
	});
}

function clearKeywordDefinitions() {
	var elements = document.getElementsByClassName('definedKeyword');
	while(elements.length > 0) {
		var element = elements[0];
		element.remove();
	}
}

function reScanKeywords() {
	var elements = document.getElementsByClassName('definition');
	
	for(var x=0; x < elements.length; x++) {
		var element = elements[x];
		checkKeywords(element);		
	}
}

function checkKeywords(node) {
	var keysFound = [];
    //clear keywords
    $('.cardGroup.selected .card .keywords').empty();

    $(node).find('.keyword').each(function(index, element){
      keysFound.push($(element).data('key'));
    });

    //sort keysfound - should be case sensitive
    keysFound = keysFound.sort(function(a,b){
      return a.localeCompare(b);
    });
	
	keywordStore = createKeywordStore();
	
	//loop through keysfound
    for(var i=0;i<keysFound.length;i++){
		var key = keysFound[i];
		
		this.addKeyword(key,keywordStore.data[key]);
    }
}

function createKeywordStore(){
	var keywordStore = $('.page').data('keywordStore');
	//var keywordStore = new KeywordStore(keywords);
	keywordStore.setupKeywordsForm();
	return keywordStore;
}

function addKeyword(key,data) {
	if(data != undefined){
		//var lKey = key.toLowerCase();
		var keyClass = resolveKeyClass(key);

		//check to see if the keyword is already added, and if the display flag does not equal false
		if( data.displayBack !== false && data.displayBack !== 'false'  && $('.cardGroup.selected .card .keywords .'+keyClass.toUpperCase()).length ===0){
		  //console.log(key,data);

		  var description = data.description;//data.get(keyClass).description;

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

			var parsedDescription = "";
			if(description != undefined){
				parsedDescription = this.parseDescription(description);
			}
			
			if(parsedDescription != "" && parsedDescription != undefined){
				var backTemplate = '<div class="keyword definedKeyword '+keyClass.toUpperCase()+'" data-key="'+key+'">'+
				'<span class="keyword '+keyClass.toUpperCase()+'"></span>'+
				'<span class="name">'+key+'</span>:'+
				'<span class="description">'+parsedDescription+'</span>'+
				'</div>';

				var itemTemplate = '<div class="keyword '+keyClass.toUpperCase()+'" data-key="'+key+'">'+
				'<span class="keyword '+keyClass.toUpperCase()+'"></span>'+
				'<span class="name">'+key+'</span> '+
				'<span class="description">'+parsedDescription+'</span>'+
				'</div>';

				$(".cardGroup.selected .card .back .keywords").append(backTemplate);

				$(".cardGroup.selected .card .item .keywords").append(itemTemplate);
			}
		}
	}
}

function resolveKeyClass(key) {
	var parts = key.split(' ');
    var returner ='';

    for(var i=0,item;(item=parts[i]);i++){
      if(i==0){
        //item = item.toLowerCase();
        item = item.replace('\'','');

        if($.isNumeric(item[0])){
          item="key-"+item;
        }
      }

      returner+=item;
    }
    return returner;
}

  function parseDescription(description){
    var keywordDescription = this.findKeywords(description);
    var affinityDescription = this.findAffinity(keywordDescription);
    var diceDescription = this.findDice(affinityDescription);
    var statDescription = this.findStats(diceDescription);
    return statDescription;
  };


 /**
   *search function that returns a modified version of the text passed into with the keywords highlighted.
   */
  this.findKeywords=function(text){
	var secondaryRe = /\b(ALL|IMMUNEBANE|IMMUNEHEX|IMMUNEFIRE|IMMUNEKNOCKDOWN|IMMUNEICE|IMMUNEIMMOBILE|IMMUNEPOISON|IMMUNESLOW|IMMUNEALL)\b/g;
    
    text = text.replace(secondaryRe,function(match){
		var result = '<span class="keyword '+match+'" data-key="'+match+'">'+match+'</span>';
		
		return result;
    }.bind(this));
	
	//console.log(this.re);
	//console.log(secondaryRe);
	
	//var combinedRegex = this.re + "|" + secondaryRe;
	
	//console.log(combinedRegex);
	
	text = text.replace(this.re,function(match){
		var key = this.lookup[match.toLowerCase()];
		var keyClass = this.resolveKeyClass(key);
		return '<span class="keyword '+keyClass.toUpperCase()+'" data-key="'+key+'">'+key+'</span>';
    }.bind(this));
	
	//console.log(text);
	
	return text;
  };

function findAffinity(description){
	var re = /\b(ALLAFFINITY|AMETHYST|AMETHYSTCITRINE|AMETHYSTEMERALD|AMETHYSTRUBY|AMETHYSTSAPPHIRE|CITRINE|CITRINEAMETHYST|CITRINEEMERALD|CITRINERUBY|CITRINESAPPHIRE|EMERALD|EMERALDAMETHYST|EMERALDCITRINE|EMERALDRUBY|EMERALDSAPPHIRE|RUBY|RUBYAMETHYST|RUBYCITRINE|RUBYEMERALD|RUBYSAPPHIRE|SAPPHIRE|SAPPHIREAMETHYST|SAPPHIRECITRINE|SAPPHIREEMERALD|SAPPHIRERUBY)\b/g;

    description = description.replace(re,function(match){
    return '<div class="affinity '+match+'" title="'+match+'"></div>';
    });
    return description;
}

function findDice(text){
	//regular expression - https://regex101.com/#javascript
    var re = /(([+-]?[0-9]+)(RG|[RBGOP]|ST|SW|MI|MA|AC|MO|HE|SH|PO))\b/g;

    text = text.replace(re,function(match,p1,p2,p3,p4){
      var c="";
      //var v = p3.toLowerCase();

      if(p3==='R'){
        c+="dice red";
      }else if(p3==='B'){
        c+="dice blue";
      }else if(p3==='G'){
        c+="dice green";
      }else if(p3==='O'){
        c+="dice orange";
      }else if(p3==='P'){
        c+="dice purple";
      }else if(p3==='ST'){
        c+="dice star";
      }else if(p3==='MA'){
        c+="offense magic";
      }else if(p3==='MI'){
        c+="offense missile";
      }else if(p3==='SW'){
        c+="offense melee";
      }else if(p3==='RG'){
        c+="offense range";
      }else if(p3==='AC'){
        c+="actionMod";
      }else if(p3==='MO'){
        c+="moveMod";
      }else if(p3==='HE'){
        c+="heartMod";
      }else if(p3==='SH'){
        c+="shieldMod";
      }else if(p3==='PO'){
        c+="potionMod";
      }
      return '<span class="'+c+'">'+(p2==='0'?'&nbsp;':p2)+'</span>';
    });
    return text;
}

 function replace1(match){
	var result = '<span class="keyword '+match+'" data-key="'+match+'">'+match+'</span>';
		
	return result;
 }
  
 function replace2(match){
	var key = this.lookup[match.toLowerCase()];
	var keyClass = this.resolveKeyClass(key);
	return '<span class="keyword '+keyClass.toUpperCase()+'" data-key="'+key+'">'+key+'</span>';
 }

function applyLanguageToDescriptions() {
	var elements = document.getElementsByClassName('description');
	for(var x=0; x < elements.length; x++) {
		var element = elements[x];
		
		var eValue = element.innerHTML;
		element.innerHTML = findStats(eValue);
		var test = "";
	}
}

//Test phrase: STR WILL DEX ARM FOR RUS FUE VOL DES GES

 function findStats(text){
    var re;
	var en = /\b(STR|ARM|WILL|DEX)\b/g;
	var de = /\b(STR|RUS|WILL|DEX)\b/g;
	var es = /\b(FUE|ARM|VOL|DES)\b/g;
	var fr = /\b(FOR|ARM|VOL|DEX)\b/g;

	if(languageChoice == "en") {
		re = en;
	} else if(languageChoice == "de") {
		re = de;
	} else if(languageChoice == "es") {
		re = es;
	} else if(languageChoice == "fr") {
		re = fr;
	} else {
		re = en;
	}
	
    text = text.replace(re,'<span class="stat $1">$1</span>');
    return text;
  };

//Test phrase: STR WILL DEX ARM FOR RUS FUE VOL DES GES

function updateStatLanguage(previousLanguage, nextLanguage) {
	var elements = document.getElementsByClassName(previousLanguage);
	var stat = 0;
	
	while(elements.length > 0) {
		var element = elements[0];
		element.classList.add('stat');
		element.classList.replace(previousLanguage, nextLanguage);		
		if(stat == 0) {
			element.classList.add('STR');
		} else if(stat == 1) {
			element.classList.add('ARM');
		} else if(stat == 2) {
			element.classList.add('WILL');
		} else if(stat == 3) {
			element.classList.add('DEX');
		}
		stat++;
	}
}

/**
 * Application main method.
 */
$(document).ready(function(){
//objects

  //Initialize mainMenu
  var promises = [];
  promises.push($.getJSON('./json/sde_keywords_english.json'));

  //resolve the templates
  $.when.apply($, promises).done(function(keywords){
      var mainMenu = new MainMenu();
      var keywordStore = new KeywordStore(keywords);
      var editorPain = new EditorPane();
      var sdeCreate = new CardContainer();
      keywordStore.setupKeywordsForm();
      $('.page').data('keywordStore',keywordStore);

      var card = new Card(false);
      card.initFirstCard();
  });

  //remove noscript block
  $('.noScript').remove();
});
