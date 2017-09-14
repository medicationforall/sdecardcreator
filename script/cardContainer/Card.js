function Card(){
  this.data={};
  this.template='<div class="cardGroup selected">'+
  	'<div class="cardDiv">'+
  		'<div class="card hero red">'+

  			'<div class="front">'+
  				'<div class="model hero monster pet arcade">'+
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
  						'<span class="hero monster arcade affinity citrine"></span>'+
  						'<span class="keywordsList"></span>'+

  						'<div class="subStats">'+
  							'<span class="hero monster wounds">5</span>'+
  							'<span class="hero potions">1</span>'+
                '<span class="monster skulls">1</span>'+
  						'</div>'+
  					'</div>'+

  					'<div class="abilities">'+
  						'<div class="monster bit eight"></div>'+
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
  							'<span class="item treasure loot explore itemStats"></span>'+
  							'<div class="item treasure loot explore wonder command timeout abilities"></div>'+
  							'<span class="keywordsList"></span>'+
  							'<div class="treasure loot wonder keywords"></div>'+
  							'<span class="item treasure wonder loot explore flavorText"></span>'+
  						'</div>'+
  					'</div>'+

  					'<div class="treasure loot placeHolder ruby">'+

  					'</div>'+
  				'</div>'+
  			'</div>'+
  		'</div>'+
  	'</div>'+

  	'<div class="cardDiv">'+
  		'<div class="card hero red">'+
  			'<div class="back">'+
  				'<div class="hero monster pet header">'+
  					'<div class="hero monster pet"><span class="title">title</span></div>'+
  					'<div class="hero monster pet"><span class="subTitle">subTitle</span></div>'+
  				'</div>'+

  				'<div class="contentBorder ruby">'+
  					'<div class="content">'+
  						'<div class="timeout">'+
  							'<div class="explore creepNum"><span class="creepSpawn">3</span></div>'+
  							'<img class="character" src="" />'+
  						'</div>'+
  						'<div><span class="timeout title">title</span></div>'+
  						'<div class="timeout abilities"></div>'+
  						'<div class="monster pet hero keywords"></div>'+

  						'<div class="monster pet hero flavor">'+
  						'<div class="flavorBorder"></div>'+
  						'<span class=" flavorText"></span>'+
  						'<div class="flavorBorder"></div>'+
  						'</div>'+
  					'</div>'+
  				'</div>'+
  			'</div>'+
  		'</div>'+
  	'</div>'+
  '</div>';

  this.node=undefined;

/**
 *
 */
  this._constructor=function(){
    var cardContainer = $('.cardContainer').data('node');
    this.node=$(this.template).appendTo(cardContainer.node);
    this.node.data('node',this);

    HasSetTypeDisplay.call(this);
    HasCardTypeControls.call(this);
    HasCardHeader.call(this);
    HasCardImage.call(this);
    HasStats.call(this);
    this.setCardType('hero');
  };


  /**
   *
   */
  this.setFlavorText=function(flavorText){
    this.data.flavorText = flavorText;
    this.node.find('.flavorText').text(flavorText);
  };


  /**
   *
   */
  this.setAffinity=function(affinity){
    this.data.affinity = affinity;
    this.node.find('.affinity').removeClass('ruby citrine emerald sapphire amethyst all');
    this.node.find('.affinity').addClass(affinity);
  };


  /**
   *
   */
  this.setKeywords=function(keywords){
      console.log('set keywords for card',keywords);
      this.data.keywords=keywords;
      var keywordStore = $('.page').data('keywordStore');

      //set parsed text
      var kText = keywordStore.findKeywords(keywords);
      this.node.find('.keywordsList').html(kText);

      //place keywords on back of card.
      keywordStore.checkKeywords(this.node.find('.front'));
  };


  /**
   * Collect the json data for the card.
   */
  this.gatherData=function(){
    return this.data;
  };

  this.addAbility=function(ability){
    console.log('card add ability');
    ability.getCardNode().appendTo(this.node.find('.abilities'));
  };


  this._constructor();
}
