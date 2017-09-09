function FlavorTextControl(){
  this.template='<div class="hero monster loot treasure wonder explore flavorText">'+
    '<h2><a class="toggleDisplay" href="">Flavor Text</a></h2>'+
    '<div class="controlContent hide">'+
    '<textarea name="flavorText" /></textarea>'+
    '</div>'+
  '</div>';

  this.node=undefined;

  this._constructor=function(){
    console.log('new Flavor Text control');
    var form = $('.editForm').data('node');
    this.node=$(this.template).appendTo(form.node);
    this.node.data('node',this);

    HasToggleDisplay.call(this);
  };

  this._constructor();
}
