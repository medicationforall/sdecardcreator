function AbilityControl(){
  this.template='<div class="hero monster pet loot treasure explore wonder command timeout abilitySection">'+
  	'<h2><a class="toggleDisplay" href="">Ability</a></h2>'+
    '<div class="controlContent hide">'+
    '<a href="" class="helpButton" title="Stats Help"><svg data-reactroot="" class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill="#ffffff" opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path fill="#000000" d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm0 30c-66.274 0-120 40.294-120 90 0 30 60 30 60 0 0-16.57 26.862-30 60-30 33.138 0 60 13.43 60 30s-30 15-60 30c-1.875.938-3.478 2.126-4.688 3.28C226.53 244.986 226 271.926 226 286v15c0 16.62 13.38 30 30 30 16.62 0 30-13.38 30-30v-15c0-45 90-40.294 90-90s-53.726-90-120-90zm0 240a30 30 0 0 0-30 30 30 30 0 0 0 30 30 30 30 0 0 0 30-30 30 30 0 0 0-30-30z"></path></g><!-- react-empty: 6 --></svg></a>'+
  	'<div class="helpBlock">'+
  		'<div class="helpUnit">'+
  		'<h3>Dice Types</h3>'+
  		'<ul>'+
      '<li>Blue: 1b</li>'+
  			'<li>Star: 1st</li>'+
  			'<li>Red: 1r</li>'+
  			'<li>Green: 1g</li>'+
  			'<li>Purple: 1p</li>'+
        '<li>Orange: 1o</li>'+
  		'</ul>'+
  		'</div>'+

  		'<div class="helpUnit">'+
  		'<h3>Modifiers</h3>'+
  		'<ul>'+
  			'<li>Melee: 1sw</li>'+
  			'<li>Missile: 1mi</li>'+
  			'<li>Magic: 1ma</li>'+
  			'<li>Range: 1rg</li>'+
  			'<li>Action: 1ac</li>'+
  			'<li>Move: 1mo</li>'+
  			'<li>Shield: 0sh</li>'+
  			'<li>heart: 1he</li>'+
  		'</ul>'+
  		'</div>'+

  		'<h3>Stats</h3>'+
  		'<ul>'+
  			'<li>Strength: STR</li>'+
  			'<li>Armor: ARM</li>'+
  			'<li>Willpower: WILL</li>'+
  			'<li>Dexterity: DEX</li>'+
  		'</ul>'+
  	'</div>'+
  	'<div class="abilities"></div>'+
  	'<a href="" class="addAbility">Add Ability +</a>'+
    '</div>'+
  '</div>';

  this.parent=undefined;
  this.node=undefined;

  this._constructor=function(){
    this.parent = $('.editForm').data('node');
    this.node=$(this.template).appendTo(this.parent.node);
    this.node.data('node',this);

    HasToggleDisplay.call(this);
    HasHelpButton.call(this);
  };

  this._constructor();
}
