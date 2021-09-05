/**
 *   SDE Card Creator source file Card,
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
 * An SDE Card.
 * @class
 */
function Card(animate,appendAfter){
  this.data={
    "cardType": "hero",
    "title": "title",
    "author":"",
    "subTitle": "subTitle",
    "move": "6",
    "actions": "3",
    "potions": "1",
    "wounds": "5",
    "keywordsList": "",
    "background": "pic1685577_md.jpg",
    "backgroundFlip": false,
    "imageSource": "default",
    "STR": "1sw 3b",
    "ARM": "2b 1r sh",
    "WILL": "3b",
    "DEX": "3b",
    "flavorText": "",
    "abilities": [],
    "affinity": "citrine"
  };

  this.template='<div class="cardGroup selected">'+
  	'<div class="cardDiv">'+
  		'<div class="card hero red">'+

  			'<div class="front">'+
        '<div class="slot ruby hero"></div>'+
        '<div class="slot emerald hero"></div>'+
        '<div class="slot saphire hero"></div>'+
        '<div class="slot citrine hero"></div>'+
  				'<div class="model hero monster pet arcadeSolo">'+
  					'<div class="header">'+
  						'<div class="moveactions" >'+
  							'<span class="move">6</span>'+
  							'<span class="actions">3</span>'+
  						'</div>'+
  						'<div><span class="title">title</span></div>'+
  						'<div><span class="subTitle">subTitle</span></div>'+
  					'</div>'+

  					'<div class="stats">'+
  					'</div>'+

  					'<img class="character" src="" />'+
  					'<div class="background" style="background:url(\'image/background/pic1685577_md.jpg\') no-repeat;background-size:100% 100%"></div>'+

  					'<div class="keywordsSection">'+
  						'<span class="hero monster arcadeSolo affinity citrine"></span>'+
  						'<span class="keywordsList"></span>'+

  						'<div class="subStats">'+
  							'<span class="hero monster wounds">5</span>'+
  							'<span class="hero potions">1</span>'+
                '<span class="monster skulls">1</span>'+
  						'</div>'+
  					'</div>'+

  					'<div class="abilities">'+
  						'<div class="monster bit eight"></div>'+
              '<div class="arcadeSolo arcadeGang arcadeMachineLogo"></div>'+
  					'</div>'+
  				'</div>'+

  				'<div class="item treasure wonder loot explore command timeout">'+
  					'<div class="contentBorder ruby">'+
  						'<div class="content">'+
  							'<div>'+
  								'<div class="explore creepNum"><span class="creepSpawn">3</span></div>'+
  								'<img class="character" src="" />'+
  							'</div>'+
  							'<div><span class="title">title</span></div>'+
  							'<span class="item treasure loot explore itemStats"><span class="dice star">+1</span></span>'+
  							'<div class="item treasure loot explore wonder command timeout abilities"></div>'+
  							'<span class="keywordsList"></span>'+
  							'<div class="treasure loot wonder keywords"></div>'+
  							'<span class="item treasure wonder loot explore flavorText"></span>'+
  						'</div>'+
  					'</div>'+
  					'<div class="treasure loot placeHolder ruby"></div>'+
  				'</div>'+

          '<div class="author"></div>'+
  			'</div>'+
  		'</div>'+
  	'</div>'+

  	'<div class="cardDiv">'+
  		'<div class="card hero red">'+
  			'<div class="back">'+
  				'<div class="hero monster pet arcadeSolo header">'+
  					'<div class=""><span class="title">title</span></div>'+
  					'<div class=""><span class="subTitle">subTitle</span></div>'+
  				'</div>'+

  				'<div class="contentBorder ruby">'+
  					'<div class="content">'+
  						'<div class="timeout">'+
  							'<div class="explore creepNum"><span class="creepSpawn">3</span></div>'+
  							'<img class="character" src="" />'+
  						'</div>'+
  						'<div><span class="timeout title">title</span></div>'+
  						'<div class="timeout abilities"></div>'+
  						'<div class="monster pet hero arcadeSolo keywords"></div>'+

  						'<div class="monster pet hero arcadeSolo flavor">'+
  						'<div class="flavorBorder"></div>'+
  						'<span class=" flavorText"></span>'+
  						'<div class="flavorBorder"></div>'+
  						'</div>'+
  					'</div>'+
            '<div class="author hero monster arcadeSolo pet timeout"></div>'+
  				'</div>'+
  			'</div>'+
  		'</div>'+
  	'</div>'+
  '</div>';

  this.node=undefined;

  /**
   * Construct the Card Instance.
   */
  this._constructor=function(){
    var cardContainer = $('.cardContainer').data('node');
    if(appendAfter){
      this.node=$(this.template).insertAfter(appendAfter);
    }else{
      this.node=$(this.template).appendTo(cardContainer.node);
    }
    this.node.data('node',this);

    HasSetTypeDisplay.call(this);
    HasCardTypeControls.call(this);
    HasCardHeader.call(this);
    HasCardImage.call(this);
    HasItemStats.call(this);
    HasStats.call(this);
    HasKeywords.call(this);
    HasAffinity.call(this);
    HasAbilities.call(this);
    HasFlavorText.call(this);
    HasBit.call(this);

    this.setCardType('hero');

    if(animate===true){
      this.node.animateCss('zoomInLeft');
    }
  };


  /**
   * Collect the json data for the card.
   */
  this.gatherData=function(){
    //clone the data
    var data = Object.assign({},this.data);

    if(this.abilities && this.abilities.length > 0){
      data.abilities = [];
      for(var i=0,ability;(ability=this.abilities[i]);i++){
        data.abilities.push(ability.gatherData());
      }
    }
    return data;
  };


  /**
   * Load card data into this card.
   * @param {object} data - Card data.
   */
  this.loadData=function(data){
    this.loadCardType(data);
    this.loadCardHeader(data);
    this.loadCardImage(data);
    this.loadCardItemStats(data);
    this.loadCardStats(data);
    this.loadCardKeywords(data);
    this.loadCardAffinity(data);
    this.loadAbilities(data);
    this.loadCardFlavorText(data);
    this.loadCardBit(data);
  };

  this.initFirstCard=function(){
    //hero
    var data = {"name":"Ability 1","costType":"attack","cost":1,"definition":"+1R -2B 3G 4O 5P 1ST 0MI 1MA 2SW 3RG AUGMENT FIRE STR WILL DEX ARM 1AC 2MO 0SH +1HE"};

    //griefer
    //data = {"cardType": "command","title": "Griefer","imageSource": "default","remoteAvatar": "","abilities": [{"costType": "special","cost": "1","name": "Bully","definition": "All Commands target Hero with the least wrath."}, {"costType": "nameOnly","cost": "1","name": "Move x1","definition": ""}, {"costType": "nameOnly","cost": "1","name": "Fight x1","definition": ""}],"customKeywords": {}};

    var abilityNode = new Ability();
    var editForm = $('.editForm').data('node');
    editForm.abilityControl.addAbilityFromCard(abilityNode,data);
    this.addAbility(abilityNode);
    abilityNode.loadData(data);
  };


  this._constructor();
}
