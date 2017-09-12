function KeywordControl(){
  this.template='<div class="hero monster pet treasure wonder loot arcade keyword">'+
  	'<h2><a class="toggleDisplay" href="">Keyword</a></h2>'+
    '<div class="controlContent hide">'+
    '<a href="" class="keywordSettings" title="keyword Editor"></a>'+
  	'<div class="hero monster arcade">'+
  		'Affinity'+
  		'<select name="affinity">'+
  			'<option value="citrine">Citrine</option>'+
  			'<option value="citrine amethyst">Citrine Amethyst</option>'+
  			'<option value="citrine emerald">Citrine Emerald</option>'+
  			'<option value="citrine ruby">Citrine Ruby</option>'+
  			'<option value="citrine sapphire">Citrine Sapphire</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="emerald">Emerald</option>'+
  			'<option value="emerald amethyst">Emerald Amethyst</option>'+
  			'<option value="emerald ruby">Emerald Ruby</option>'+
  			'<option value="emerald sapphire">Emerald Sapphire</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="ruby">Ruby</option>'+
  			'<option value="ruby amethyst">Ruby Amethyst</option>'+
  			'<option value="ruby sapphire">Ruby Sapphire</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="sapphire">Sapphire</option>'+
  			'<option value="sapphire amethyst">Sapphire Amethyst</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="amethyst">Amethyst</option>'+
  			'<option disabled>----------</option>'+
  			'<option value="none">None</option>'+
  			'<option value="all">All</option>'+
  		'</select>'+
  	'</div>'+

  	'<div>Keywords <input name="keywordsList" required maxlength="80" /></div>'+
    '</div>'+
  '</div>';

  this.parent=undefined;
  this.node=undefined;

  this._constructor=function(){
    this.parent = $('.editForm').data('node');
    this.node=$(this.template).appendTo(this.parent.node);
    this.node.data('node',this);

    HasToggleDisplay.call(this);
  };

  this._constructor();
}
