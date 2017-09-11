function HeaderControl(){
  this.template='<div class="header">'+
  	'<h2><a class="toggleDisplay" href="">Header</a></h2>'+
    '<div class="controlContent hide">'+
  	'<div class="hero monster pet treasure wonder loot explore command arcade timeout">*Title <input name="title" required maxlength="30" /></div>'+
  	'<div class="hero monster pet arcade">Sub-Title <input name="subTitle" maxlength="40" /></div>'+

  	'<div class="hero monster pet">'+
  		'Move <input class="number" type="number" name="move" value="6" min="-9" max="99" />'+
  		'Actions <input class="number" type="number" name="actions" value="3" min="-9" max="99"  />'+
  	'</div>'+
  '</div>'+
  '</div>';

  this.parent=undefined;
  this.node=undefined;

  this._constructor=function(){
    this.parent = $('.editForm').data('node');
    this.node=$(this.template).appendTo(this.parent.node);
    this.node.data('node',this);

    HasToggleDisplay.call(this);
    HasTitleControl.call(this);
    HasSubTitleControl.call(this);
    HasMoveControl.call(this);
    HasActionsControl.call(this);
  };

  this._constructor();
}
