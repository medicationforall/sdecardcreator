function HeaderControl(){
  this.template='<div class="header">'+
  	'<h2>Header</h2>'+
  	'<div class="hero monster pet treasure wonder loot explore command arcade timeout">*Title <input name="title" required maxlength="30" /></div>'+
  	'<div class="hero monster pet arcade">Sub-Title <input name="subTitle" maxlength="40" /></div>'+

  	'<div class="hero monster pet">'+
  		'Move <input class="number" type="number" name="move" value="6" min="-9" max="99" />'+
  		'Actions <input class="number" type="number" name="actions" value="3" min="-9" max="99"  />'+
  	'</div>'+
  '</div>';

  this.node=undefined;

  this._constructor=function(){
    console.log('new Header control');
    var form = $('.editForm').data('node');
    this.node=$(this.template).appendTo(form.node);
    this.node.data('node',this);
  };

  this._constructor();
}
