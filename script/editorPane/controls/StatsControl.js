function StatsControl(){
  this.template='<div class="hero monster pet stats">'+
    '<h2><a class="toggleDisplay" href="">Stats</a> <a href="" class="helpButton" title="Stats Help">?</a></h2>'+
    '<div class="controlContent hide">'+
    '<div class="helpBlock">'+
      '<div class="helpUnit">'+
      '<h3>Dice Types</h3>'+
      '<ul>'+
        '<li>Star: 1st</li>'+
        '<li>Blue: 1b</li>'+
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
        '<li>Shield: sh</li>'+
      '</ul>'+
      '</div>'+
    '</div>'+

    '<div class="hero monster pet">STR <input name="STR" value="1sw 3b" /></div>'+
    '<div class="hero monster pet">ARM <input name="ARM" value="2b 1r sh" /></div>'+
    '<div class="hero monster">WILL <input name="WILL" value="3b" /></div>'+
    '<div class="hero monster">DEX <input name="DEX" value="3b" /></div>'+
    '<div class="hero monster displayInline">Wounds <input class="number" type="number" name="wounds" value="5" min="-9" max="99" /></div>'+
    '<div class="monster displayInline">Skull Points <input class="number" type="number" name="skulls" value="1" min="-9" max="99" /></div>'+
    '<div class="hero displayInline">Potions <input class="number" type="number" name="potions" value="1" min="-9" max="99" /></div>'+
  '</div>'+
  '</div>';

  this.node=undefined;

  this._constructor=function(){
    console.log('new stats control');
    var form = $('.editForm').data('node');
    this.node=$(this.template).appendTo(form.node);
    this.node.data('node',this);

    HasToggleDisplay.call(this);
  };

  this._constructor();
}
